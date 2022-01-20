const {createProxyMiddleware} = require("http-proxy-middleware");

// for redirects not to localhost for Google logins
module.exports = function (app) {
    app.use(
        ["/api", "/auth/google"],
        createProxyMiddleware({
            target: "http://localhost:4000",
        })
    );
};