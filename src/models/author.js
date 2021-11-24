const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    firstName: { type: String, required: true, maxLength: 50 },
    lastName: { type: String, required: true, maxLength: 50 },
    dateOfBirth: { type: Date },
    dateOfDeath: { type: Date }
})

AuthorSchema.virtual('age').get(function() {
    return calculateAge(this.dateOfBirth, this.dateOfDeath);
})

AuthorSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
})

AuthorSchema.virtual('url').get(function() {
    return `/catalog/authors/${this._id}`;
});

function calculateAge(dateOfBirth, dateOfDeath) {

    let age;
    
    if (dateOfDeath) {
        age = new Date(dateOfDeath) - new Date(dateOfBirth);
    } else {
        age = Date.now() - new Date(dateOfBirth);
    }
    
    return Math.floor(age / (1000 * 60 * 60 * 24 * 365));

}

module.exports = mongoose.model('Author', AuthorSchema);
module.exports.calculateAge = calculateAge;