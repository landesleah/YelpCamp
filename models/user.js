const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

UserSchema.plugin(passportLocalMongoose);
// adds onto Schema username and password
// makes sure usernames are unique, gives some other methods

module.exports = mongoose.model('User', UserSchema);