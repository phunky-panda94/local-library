const Author = require('../models/author');

// display list of authors
exports.getAllAuthors = (req, res) => {
    
    // TODO: add number of publications to query

    Author.find({}, 'firstName lastName dateOfBirth dateOfDeath')
        .sort({ lastName: 'asc' })
        .exec((err, authors) => {
            if (err) {
                return next(err);
            }
            res.render('authors', { title: 'All Authors', authors: authors });
        })

};

// display author detail page
exports.getAuthorDetails = (req, res) => {
    res.send(`Author details for ${req.params.id}`);
}

// display create new author form
exports.getNewAuthorForm = (req, res) => {
    res.send('Create new author');
}

// handle create new author
exports.createNewAuthor = (req, res) => {
    res.send('Creating new author');
}

// handle delete author
exports.deleteAuthor = (req, res) => {
    res.send(`Delete author ${req.params.id}`);
}

// handle update author
exports. updateAuthor = (req, res) => {
    res.send(`Update author ${req.params.id}`);
}