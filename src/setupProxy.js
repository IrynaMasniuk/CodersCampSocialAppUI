const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api", { target: "https://infinite-thicket-17097.herokuapp.com" })
    // proxy("/api", { target: "http://localhost:5000" })
  );
};