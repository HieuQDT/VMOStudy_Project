const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    birthyear: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user'],
    },
    verified: {
        type: Boolean,
        required: true,
        default: false,
    },
    saleNotification: {
        type: Boolean,
        default: true,
    },
});

///////////////////////////////////// HASH PASSWORD
userSchema.pre('save', function (next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

///////////////////////////////////// TOKEN USE FOR EMAIL FUNCTION
userSchema.methods.generateVerificationToken = function () {
    const user = this;
    const verificationToken = jwt.sign(
        { ID: user._id },
        process.env.TOKEN_SECRET,
        { expiresIn: '7d' },
    );

    return verificationToken;
};

///////////////////////////////////// EXPORT 
module.exports = mongoose.model('User', userSchema);

