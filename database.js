const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let geoSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number]
    }
});

const Sale = new Schema({
    "geolocation": {
        "type": geoSchema,
        "index": "2dsphere"
    },
    "title": String,
    "address": String,
    /*"location": {
        "latitude": Number,
        "longitude": Number
    },*/
    "startDate": Date,
    "endDate": Date,
    "description": String,
    /*"items": [
        {
            "name": String,
            "price": Number,
            "description": String
        }
    ]*/
});

let Event;

module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        let db = mongoose.createConnection("mongodb://hackGS:hackGS1@ds255784.mlab.com:55784/hackgarage",
            { useNewUrlParser: true });
        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            console.log("I'm here");
            Event = db.model("Sales", Sale);
            resolve();
        });
    });
};

module.exports.registerUser = (newGS) => {
    return new Promise((resolve, reject) => {
        let newSale = new Event(newGS);
        newSale.save((error) => {
            if (error && error.code != 11000) {
                reject("There was an error creating the user: " + error);
            }
            else
                resolve();
        })
    })
};

module.exports.retrieveItem = (item) => {
    return new Promise((resolve, reject) => {
        Event.find({
            name: item
        })
            .exec()
            .then((data) => {
                console.log("Ok, I found the item");
                resolve(data)
            })
            .catch(() => {
                reject("Unable to find item: " + item);
            })
    })
};

module.exports.retrieveInRadius = (lng, lat, rad = 5000) => {
    return new Promise((resolve, reject) => {
        Event.find().where('geolocation').near({
            center: {
                coordinates: [lng, lat],
                type: 'Point'
            },
            maxDistance: rad
        }).then((data) => {
            resolve(data);
        }).catch(() => {
            console.log("bullshit");
            reject("error finding elements in radius");
        });
    });
};
