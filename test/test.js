const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHTTP);

describe('POST /sale', () => {
    chai.request(server)
    .post('/sale').send({})
    .end((err, res) => {
        if(err) console.log(err);
        res.should.have.status(200);
        done();
    });
});