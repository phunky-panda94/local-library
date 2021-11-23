const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

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

BookInstanceSchema.virtual('formattedDueDate').get(function() {
    return formatDate(this.dueDate);
});

function formatDate(date) {

    let JSDate = new Date(date)

    return DateTime.fromJSDate(JSDate).toLocaleString(DateTime.DATE_MED);
}

module.exports = mongoose.model('BookInstance', BookInstanceSchema);
module.exports.formatDate = formatDate;