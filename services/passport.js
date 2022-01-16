const passport = require("passport");
const {Strategy: GoogleStrategy} = require("passport-google-oauth20");
const {googleClientID, googleClientSecret} = require("../config/keys");
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

});

passport.use(new GoogleStrategy({
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
    // code doesn't return user directly, but rather returns a promise so need async/await
        User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if (existingUser) {
                    // we already have a record of the given user
                    // tell user we're finished, we've found the existingUser
                    done(null, existingUser);
                } else {
                    // we don't have a user record, make new record
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user))
                }
            });
    }
));