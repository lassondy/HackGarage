
const validator = require('validator');
const uuidv1 = require('uuid/v1');
const { InvalidData } = require('../error');


class Sale {
    
    constructor(data) {
        if(!Sale.validateData(data)) throw new InvalidData('The data provided is invalid or malformed');
        this.id = uuidv1(); 
        this.title = data.title;
        this.location = data.location;
        this.duration = data.duration;
        this.description = data.description;
        this.address = data.address;
    }

    // validates client provided data, returns true if all data valid
    static validateData(data) {
        let validated = true;

        // object containing valid properties and their type
        const validProperties = {
            start: 'String',
            end: 'String',
            title: 'String',
            description: 'String',
            address: 'String',
            location: 'Object'
        }
        

        // check if parameter is a object
        if( !data || data.constructor !== Object ) {
            validated = false;
            throw new InvalidData('The data provided is invalid or malformed');
        }

        // check if object has correct number of properties and type
        if (Object.keys(data).length !== Object.keys(validProperties).length) validated = false;

        Object.keys(data).forEach((property) =>{
            if (!validProperties.hasOwnProperty(property)) {
                validated = false;
                throw new InvalidData('The data provided is invalid or malformed');
            }            
        });        

        // ensure location object has only two properties, latitude and longitude 
        validated = Object.keys(data.location).length === 2 ? validated : false;
        if(!validated) throw new InvalidData('The data provided is invalid or malformed');

        if(data.location.constructor !== Object) validated = false;
        Object.keys(data.location).forEach((key)=>{
            if (key !== 'latitude' && key != 'longitude') {
                validated = false;
                throw new InvalidData('The data provided is invalid or malformed');
            }
        });

        const reg = new RegExp("^-?([1-8]?[1-9]|[1-9]0)\.{1}\\d{0,9}");

        // validate latitude and longitude parameters
        console.log(data.location.longitude);
        console.log(reg.exec(data.location.longitude));
        if (!reg.exec(data.location.latitude) || !reg.exec(data.location.longitude)) throw new InvalidData('The data provided is invalid or malformed');


        //TODO: date validation

       // if (!validator.isAlphanumeric(data.description)) throw new InvalidData('The data p`rovided is invalid or malformed');

        // const latLong = data.location.lat + ", " + data.location.long; // verify property names of lat long in JSON object
        // const validLocation = validator.isLatLong(latLong) ? latLong : null; // validate location string
        // if(!validLocation) validated = false;        

        return validated;
    }


}

module.exports = Sale;