const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Creating schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'manager', 'waiter'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Pre-save middleware to hash password before saving
personSchema.pre('save', async function (next) {
    const person = this;
    
    // Only hash the password if it has been modified (or is new)
    if (!person.isModified('password')) return next();

    try {
        // Generate salt
        const salt = await bcrypt.genSalt(10);

        // Hash password using the salt
        const hashPassword = await bcrypt.hash(person.password, salt);

        // Override the plain password with the hashed one
        person.password = hashPassword;

        next(); // Proceed to the next middleware
    } catch (error) {
        return next(error);
    }
});

// Instance method to compare passwords
personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        // Compare the plain text password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

// Creating the model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
