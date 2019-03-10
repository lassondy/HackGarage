
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
            title: 'String',
            location: 'string',
            saleDate: 'Object',
            description: 'String',
            address: 'String',
        }
        

        // check if parameter is a object
        if( !data || data.constructor !== 'Object' ) {
            validated = false;
        }

        // check if object has correct number of properties and type
        if (Object.keys(data).length !== validProperties.length) validated = false;

        Object.keys(data).forEach((property) =>{
            if (!validProperties.hasOwnProperty(property)
            || data[property] !== this.validProperties[property].constructor
            ) validated = false;            
        });        

        // ensure location object has only two properties, lat and long
        validated = Object.keys(data.location).length === 2 ? validated : false;

        Object.keys(data.location).forEach((key)=>{
            if (key !== 'lat' || key != 'long') validated = false;
        });

        const reg = new RegExp("^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}");

        // validate latitude and longitude parameters
        if (validated && (!reg.exec(data.location.lat) || !reg.exec(data.location.long))) valid = false;

        //TODO: date validation

        if (!validator.isAlphanumeric(data.description)) validated = false;

        // const latLong = data.location.lat + ", " + data.location.long; // verify property names of lat long in JSON object
        // const validLocation = validator.isLatLong(latLong) ? latLong : null; // validate location string
        // if(!validLocation) validated = false;        

        return validated;
    }


}

module.exports = Sale;