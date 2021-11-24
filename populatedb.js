#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
const async = require('async');
const Author = require('./src/models/author');
const Book = require('./src/models/book');
const BookInstance = require('./src/models/bookInstance');

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let authors = [];
let books = [];
let bookInstances = [];

function authorCreate(firstName, lastName, dateOfBirth, dateOfDeath, cb) {

    details = {
        firstName: firstName, 
        lastName: lastName,
    }

    if (dateOfBirth != false) details.dateOfBirth = dateOfBirth;
    if (dateOfDeath != false) details.dateOfDeath = dateOfDeath;
    
    let author = new Author(details);
         
    author.save((err) => {

        if (err) {
            console.log(`ERROR CREATING Author: ${author.fullName}`);
            console.log(`Reason: ${err}`);
            cb(err, null);
            return;
        }

        console.log(`New author created: ${author.fullName}`);
        authors.push(author);
        cb(null, author);

    });

}
  
function bookCreate(title, author, genre, summary, isbn, cb) {

    details = {
        title: title,
        author: author,
        genre: genre,
        summary: summary,
        isbn: isbn
    }

    let book = new Book(details);

    book.save((err) => {

        if (err) {
            console.log(`ERROR CREATING Book: ${book.title}`);
            console.log(`Reason: ${err}`);
            cb(err, null);
            return;
        }

        console.log(`New Book created: ${book.title}`);
        books.push(book);
        cb(null, book);

    });

}

function bookInstanceCreate(book, imprint, type, status, dueDate, cb) {
    details = {
        book: book,
        imprint: imprint,
        type: type,
    }

    if (dueDate != false) details.dueDate = dueDate;
    if (status != false) details.status = status;

    let bookInstance = new BookInstance(details);

    bookInstance.save((err) => {

        if (err) {
            console.log(`ERROR CREATING BookInstance: ${bookInstance.book.title}-${bookInstance.imprint}-${bookInstance.type}`);
            console.log(`Reason: ${err}`);
            cb(err, null);
            return;
        }

        console.log(`New BookInstance created: ${bookInstance.book.title}-${bookInstance.imprint}-${bookInstance.type}`);
        bookInstances.push(bookInstance);
        cb(null, book);

    });
}

function createAuthors(cb) {

    async.series([
        (callback) => {
          authorCreate('Patrick', 'Rothfuss', '1973-06-06', false, callback);
        },
        (callback) => {
          authorCreate('Ben', 'Bova', '1932-11-8', false, callback);
        },
        (callback) => {
          authorCreate('Isaac', 'Asimov', '1920-01-02', '1992-04-06', callback);
        },
        (callback) => {
          authorCreate('Bob', 'Billings', '1925-03-07', false, callback);
        },
        (callback) => {
          authorCreate('Jim', 'Jones', '1971-12-16', false, callback);
        }
    ], cb);

}

function createBooks(cb) {
    async.parallel([
        (callback) => {
            bookCreate(
                'The Name of the Wind (The Kingkiller Chronicle, #1)',
                authors[0],
                'Fantasy',
                'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.',
                '9781473211896',
                callback
            );
        },
        (callback) => {
            bookCreate(
                "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
                authors[0],
                'Fantasy',
                'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.',
                '9788401352836',
                callback
            );
        },
        (callback) => {
            bookCreate(
                "The Slow Regard of Silent Things (Kingkiller Chronicle)",
                authors[0],
                'Fantasy',
                'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.',
                '9780756411336',
                callback
            );
        },
        (callback) => {
            bookCreate(
                "Apes and Angels",
                authors[1],
                'Science Fiction',
                "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...",
                '9780765379528',
                callback
            );
        },
        (callback) => {
            bookCreate(
                "Death Wave",
                authors[1],
                'Science Fiction',
                "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...",
                '9780765379504',
                callback
            );
        },
        (callback) => {
            bookCreate(
                'Test Book 1',
                authors[4],
                'French Poetry',
                'Summary of test book 1',
                'ISBN111111',
                callback
            );
        },
        (callback) => {
            bookCreate(
                'Test Book 2',
                authors[4],
                'French Poetry',
                'Summary of test book 2', 
                'ISBN222222', 
                callback
            );
        }
    ], cb);
}

function createBookInstances(cb) {
    async.parallel([
        (callback) => {
            bookInstanceCreate(
                books[0],
                'London Gollancz, 2014.', 
                'Paperback', 
                'Available',
                false,
                callback
            );
        },
        (callback) => {
            bookInstanceCreate(
                books[1], 
                ' Gollancz, 2011.', 
                'Paperback',
                'Borrowed',
                '2021-12-15',
                callback
            );
        },
        (callback) => {
            bookInstanceCreate(
                books[2],
                ' Gollancz, 2015.',
                'Paperback',
                'Reserved',
                false,
                callback
            );
        },
        (callback) => {
            bookInstanceCreate(
                books[3], 
                'New York Tom Doherty Associates, 2016.', 
                'E-book', 
                'Available', 
                false, 
                callback
            );
        },
        (callback) => {
            bookInstanceCreate(
                books[3], 
                'New York Tom Doherty Associates, 2016.', 
                'Hardcover', 
                'Available',
                false, 
                callback
            );
        },
        (callback) => {
            bookInstanceCreate(
                books[3], 
                'New York Tom Doherty Associates, 2016.', 
                'Paperback', 
                'Available', 
                false, 
                callback
            );
        },
        (callback) => {
            bookInstanceCreate(
                books[4], 
                'New York, NY Tom Doherty Associates, LLC, 2015.', 
                'E-book', 
                'Available', 
                false, 
                callback
            );
        },
        (callback) => {
            bookInstanceCreate(
                books[4], 
                'New York, NY Tom Doherty Associates, LLC, 2015.', 
                'Hardcover', 
                'Borrowed', 
                '2021-12-23', 
                callback
            );
        },
        (callback) => {
            bookInstanceCreate(
                books[4], 
                'New York, NY Tom Doherty Associates, LLC, 2015.', 
                'Paperback', 
                'Borrowed',
                '2022-01-15', 
                callback
            );
        },
        (callback) => {
            bookInstanceCreate(
                books[0], 
                'Imprint XXX2', 
                'E-book', 
                'Available', 
                false, 
                callback
            )
        },
        (callback) => {
            bookInstanceCreate(
                books[1], 
                'Imprint XXX3', 
                'E-book', 
                'Available', 
                false, 
                callback
            );
        }
    ], cb);
}

async.series([createAuthors, createBooks, createBookInstances], (err, results) => {

    if (err) {
        console.log(`ERROR: ${err}`);
    }
    else {
        console.log('Data successfully loaded!');
    }
    mongoose.connection.close();

});



