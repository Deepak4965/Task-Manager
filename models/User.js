const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//Define the user Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
}, { timestamps: true })

//Hash password before save
UserSchema.pre('save', async function (next) {
    const user = this;

    //Hash the password only if it has been modified (or is now)
    if (!user.isModified('password')) return next() // true-->false do not skip and reverse false-->true->skip to not hashing
    try {
        //hash paaword generation
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashpassword = await bcrypt.hash(user.password, salt);

        //Override the plain password with the hashed one
        user.password = hashpassword;
        next();
    } catch (err) {
        return next(err)
    }
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        //Use bcrypt to compare the provided password with hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
}

const user = mongoose.model("user", UserSchema)

module.exports = user;