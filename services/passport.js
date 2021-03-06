const {Strategy: GoogleStrategy} = require("passport-google-oauth20");
const keys = require("../config/keys");
const passport = require("passport");
const mongoose = require("mongoose");

// one argument means we are pulling something out of mongoose
const User = mongoose.model('users');

// serialize user and return a cookie/token set to that user
passport.serializeUser((user, done) => {
    // done is callback function we call after finishing some task
    // returns the user id that identifies the user in follow-up requests
    // a bit confusing because this user.id is *not* a profile id, but rather the mongo identifier
    // this is because we could have multiple identity providers (e.g. FB, LinkedIn), so need common id
    done(null, user.id);
});

// deserialize the user.id that was serialized into the cookie
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            // null is b/c done always takes on an error object
            done(null, user);
        })
});

passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
    // code doesn't return user directly, but rather returns a promise so need async/await
        const existingUser = await User.findOne({ googleId: profile.id })
        if (existingUser) {
            // we already have a record of the given user
            // tell user we're finished, we've found the existingUser
            return done(null, existingUser);
        }
        // we don't have a user record, make new record
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
    }
));