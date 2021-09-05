const proxy = require("http-proxy-middleware");

const devServer = "192.168.102.133:8081";
const qaServer = "10.234.55.149";

module.exports = function(app) {
  let testServer = "";
  if (process.env.proxy === "localhost") {
    testServer = "localhost";
  }
  if (process.env.proxy === "dev") {
    testServer = devServer;
  }
  if (process.env.proxy === "qa") {
    testServer = qaServer;
  }

  app.use(
    proxy(["/api", "/register", "/oauth", "/file", "/public"], {
      target: `http://${testServer}:8081`
    })
  );
};
