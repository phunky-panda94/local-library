const Book = require('../models/book');
const BookInstance = require('../models/bookInstance');

// display BookInstance details
exports.getBookInstanceDetails = (req, res) => {
    res.send(`BookInstance details for ${req.params.id}`);
}

// display create new BookInstance form
exports.getNewBookInstanceForm = (req, res) => {
    res.send('New BookInstance form');
}

// handle create new BookInstance
exports.createNewBookInstance = (req, res) => {
    res.send('Creating new BookInstance');
}

// handle delete BookInstance 
exports.deleteBookInstance = (req, res) => {
    res.send(`Deleting BookInstance ${req.params.id}`);
}

// handle update BookInstance
exports.updateBookInstance = (req, res) => {
    res.send(`Updating BookInstance ${req.params.id}`);
}