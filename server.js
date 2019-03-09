const express = require('express');
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
const database = require('./database');

const server = express();
const HTTP_PORT = process.env.PORT || 3000;

server.use(bodyParser.json())

function onHTTPStart() {
    console.log(`listening on port ${HTTP_PORT}`);
}

/********************** ENDPOINTS ***************************/

// CREATE route 

// root endpointc
server.get('/', (req, res, next) => {

});

// create a new Sale item
server.post('/sale', (req, res, next) => {

});

// error handler
server.use((err,req,res,next)=> res.status(err.status).json(err));


database.initialize().then(()=>{

    server.listen(HTTP_PORT, () => {
        onHTTPStart();
    });
})



module.exports = server; // for testing