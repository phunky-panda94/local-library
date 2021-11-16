const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    imprint: { type: String, required: true },
    type: { type: String, required: true, enum: ['E-book','Paperback','Hardcover'] },
    status: { type: String, required: true, enum: ['Available', 'Borrowed', 'Reserved'] },
    dueDate: { type: Date }
});

BookInstanceSchema.virtual('url').get(function() {
    return `/catalog/book/${this.book._id}/instance/${this._id}`
});

module.exports = mongoose.model('BookInstance', BookInstanceSchema);