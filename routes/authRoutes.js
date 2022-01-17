// whenever user comes to /auth/google route we want to kick them into the OAuth flow
// which is being managed by passport
const passport = require("passport");

// exporting a function from this file
// assume we will call this function from our express app object
module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        // scope provides to server's what access we want to user's profile, i.e. profile and email
        scope: ['profile', 'email']
    }));

// need to add a callback API call
// tell passport to use its Google strategy to handle the incoming request
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        // takes cookie that has our user.id and kills the id in there
        req.logout();
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
        // tests to make sure someone who has already gone through OAuth flow is authenticated as a user
       res.send(req.user);
    });

};