class InvalidData extends Error {
    constructor(message) {
        super(message);
        this.status = 400; // check to see if status code makes sense
        this.error = "passed invalid data";
    }
}

module.exports = InvalidData;