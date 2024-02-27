const mongoose = require("mongoose");
const { number } = require("zod");
mongoose.connect("mongodb+srv://snehaagarwal2223:zPR0K5RmKVqNboPl@cluster0.iz6lnls.mongodb.net/test");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 6,
    },

    password: {
        type: String,
        required: true,
        minLength: 6,
    },

    firstName: {
        type: String,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
    },
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    balance: {
        type: Number,
        required: true,
    },

});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account,
};