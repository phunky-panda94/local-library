const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    firstName: { type: String, required: true, maxLength: 50 },
    lastName: { type: String, required: true, maxLength: 50 },
    dateOfBirth: { type: Date },
    dateOfDeath: { type: Date }
})

AuthorSchema.virtual('age').get(function() {
    let age;

    if (this.dateOfDeath) {
        age = new Date(JSON.parse(this.dateOfDeath)) - new Date(JSON.parse(this.dateOfBirth));
    } else {
        age = Date.now() - new Date(JSON.parse(this.dateOfBirth));
    }
    
    return age;
})

AuthorSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
})

AuthorSchema.virtual('url').get(function() {
    return `/catalog/author/${this._id}`;
});

module.exports = mongoose.model('Author', AuthorSchema);