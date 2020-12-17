/* eslint-disable */
let config;
if ("development" === process.env.NODE_ENV) {
  config = require("./build/dev");
} else if ("production" === process.env.NODE_ENV) {
  config = require(`./build/build-${process.env.BUILD_TARGET}`);
}
module.exports = config;