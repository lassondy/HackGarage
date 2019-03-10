var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var Sale = new Schema({
    //"location": { type: [Number], index: '2dsphere' },
    "title": String,
    "address": String,
    "location": {
        "lat": Number,
        "long": Number
    },
    "duration": {
        "startTime": Number,
        "endTime": Number
    },
    "description": String,
    "items": [
        {
            "name": String,
            "price": Number,
            "description": String
        }
    ]
});

let event;

module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection("mongodb://hackGS:hackGS1@ds255784.mlab.com:55784/hackgarage");
        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            event = db.model("sales", sale);
            resolve();
        });
    });
};

module.exports.registerUser = (newGS) => {
    return new Promise((resolve, reject) => {
        console.log(newGS);
        let newSale = new Sale(newGS);
        newSale.save((error) => {
            if (error && error.code != 11000) {
                reject("There was an error creating the user: " + error);
            }
            else
                resolve();
        })
    })
};

module.exports.retrieveItem = function (item) {
    return new Promise((resolve, reject) => {
        event.find({
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
