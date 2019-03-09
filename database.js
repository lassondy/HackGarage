var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var userSchema = new Schema({
    "title": String,
    "location": {
        "lat": Number,
        "long": Number
    },
    "duration": {
        "date": Date,
        "startTime": Number,
        "endTime": Number
    },
    "garageDescription": String,
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
            event = db.model("users", userSchema);
            resolve();
        });
    });
};

module.exports.registerUser = (userData) => {
    return new Promise((resolve, reject) => {
        console.log(userData);
        let newUser = new User(userData);
        newUser.save((error) => {
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
            item: items.name
        })
            .exec()
            .then((data) => {
                if (data.length === 0) {
                    reject("Couldn't find item " + item);
                }
                else {
                    console.log("Ok, I found the item");
                    resolve(data)
                }
            })
            .catch(() => {
                reject("Unable to find user: " + userData.userName);
            })
    })
};
