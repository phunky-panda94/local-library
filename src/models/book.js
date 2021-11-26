const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: { type: String, required: true, maxLength: 100 },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    genre: { type: String, required: true },
    summary: { type: String },
    isbn: { type: String, required: true }
});

BookSchema.virtual('url').get(function() {
    return `/catalog/books/${this._id}`;
});

module.exports = mongoose.model('Book', BookSchema);