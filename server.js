const express = require('express');
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1')

const server = express();
const HTTP_PORT = process.env.PORT || 3000;


function onHTTPStart() {
    console.log(`listening on port ${HTTP_PORT}`);
}

/********************** ENDPOINTS ***************************/

// CREATE route 

server.post('/sale', (req, res) => {

});