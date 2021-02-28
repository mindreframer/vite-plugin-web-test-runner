// NODE_ENV=test - Needed by "@snowpack/web-test-runner-plugin"
process.env.NODE_ENV = 'test';

let snowpackPlugin = require('vite-plugin-web-test-runner/indexSnowPack')
let vitePlugin = require("vite-plugin-web-test-runner")
console.log(snowpackPlugin())
console.log(vitePlugin())

module.exports = {
  // plugins: [snowpackPlugin()],
  plugins: [vitePlugin()],
  port: 8081,
};
