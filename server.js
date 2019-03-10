const express = require('express');
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
const database = require('./database');
const Sale = require('./Sale/Sale');
const { InvalidData } = require('./error');
const validator = require('validator');

const data = require('./data/sample.json');

const server = express();
const HTTP_PORT = process.env.PORT || 3000;

server.use(bodyParser.json())

function onHTTPStart() {
    console.log(`listening on port ${HTTP_PORT}`);
}

/********************** ENDPOINTS ***************************/

// CREATE route 

// root endpoint
server.get('/', (req, res, next) => {

});

// create a new Sale item
server.post('/sale', (req, res, next) => {
    data.forEach((element) => {
        const sale = new Sale(element);
        database.registerUser(sale);
    });
    res.status(200).send(null);
    next();
});

//get  sale by id
server.get('/sale/:id', (req,res,next) => {

});

// get sales within certain coordinate range
server.get('/sale/find/:coordinates', (req,res,next) => {
    let coordinates = decodeURIComponent(req.params.coordinates);
    let latitude;
    let longitude;
    let radius;
    if(!coordinates.includes('geo') || !coordinates.includes('rad')) throw new InvalidArgument('invalid or malformed coordinates');
    else {
        coordinates = coordinates.slice(
            coordinates.search('geo:' +4)
        );
        if (!validator.isLatLong(coordinates.slice(4,coordinates.search('rad')))) throw new InvalidData('invalid coordinates');
        
        latitude = coordinates.slice(
            0, coordinates.search(',')
        );

        longitude = coordinates.slice(
            coordinates.search(',')+1,
            coordinates.search('rad:')
        );

        radius = coordinates.slice(
            coordinates.search('rad:') + 4
        );

        if (!validator.isNumeric(radius)) throw new InvalidData('Invalid radius');
    }

    database.retrieveInRadius(latitude, longitude, radius).then(
        (data) => {
            res.status(200).json(data);
        }
    ).catch((err) => {
        next(err);
    });
});



// error handler
server.use((err,req,res,next)=>  {
    console.log(err);
    res.status(err.status).json(err)
});


database.initialize().then(()=>{

    server.listen(HTTP_PORT, () => {
        onHTTPStart();
    });
});



module.exports = server; // for testing