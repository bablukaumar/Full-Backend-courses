const LocalStrategy = require('passport-local').Strategy;
const Person = require('./DataModal/PersonDataModal');
const passport = require('passport');

// Passport local strategy for authentication
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            // Find the user by username
            const user = await Person.findOne({ username });

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            // Compare the password
            const isPasswordMatch = await user.comparePassword(password);

            if (isPasswordMatch) {
                return done(null, user);  // Authentication succeeded
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        } catch (error) {
            return done(error);
        }
    }
));

module.exports = passport;
