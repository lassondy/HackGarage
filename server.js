const express = require('express');
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
const database = require('./database');
const Sale = require('./Sale/Sale');

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
    console.log('in POST /sale');
    data.data.forEach(element => {
        const sale = new Sale(element);
        console.log(sale);
        database.registerUser(sale);
    });
    res.status(200);
    next();
});

//get  sale by id
server.get('sale/:id', (req,res,next) => {

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
})



module.exports = server; // for testing