const vite = require('vite');
const path = require('path');
const { ServerResponse } = require('http');
const { isTestFilePath } = require('@web/test-runner');

// quick toggleable log function
const VERBOSE = true;
function log(el) {
  if (VERBOSE) {
    console.log(el);
  }
}

log(vite);

/**
 * Checks whether the url is a virtual file served by @web/test-runner.
 * @param {string} url
 */
function isTestRunnerFile(url) {
  return (
    url.startsWith('/__web-dev-server') || url.startsWith('/__web-test-runner')
  );
}

module.exports = function () {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error(`@vite/web-test-runner-plugin: NODE_ENV must === "test" to build files correctly.
To Resolve:
  1. Set "process.env.NODE_ENV = 'test';" at the top of your web-test-runner.config.js file (before all imports).
  2. Prefix your web-test-runner CLI command: "NODE_ENV=test web-test-runner ...".
`);
  }
  let server, config;

  return {
    name: 'vite-plugin',
    async serverStart({ fileWatcher }) {
      config = await vite.resolveConfig({ server: { port: 8081 } });
      server = await vite.createServer(config);
    },
    async serverStop() {
      return server.close();
    },
    async serve({ request }) {
      if (isTestRunnerFile(request.url)) {
        return;
      }
      const reqPath = request.path;
      log('REQ: ', request);
      log('SERVER', server);
      try {
        // const result = await server.loadUrl(reqPath, { isSSR: false });
        // const result = await server.middlewares.handle(request)
        // const result = await server.transformRequest(request.path, {ssr: false, html: false})
        log('RESULT', result);
        return { body: result.contents, type: result.contentType };
      } catch (e) {
        console.log(e);
        return;
      }
    },
    transformImport({ source }) {
      if (!isTestFilePath(source) || isTestRunnerFile(source)) {
        return;
      }
      // PERF(fks): https://github.com/snowpackjs/snowpack/pull/1259/files#r502963818
      const reqPath = source.substring(
        0,
        source.indexOf('?') === -1 ? undefined : source.indexOf('?'),
      );
      const sourcePath = path.join(config.root || process.cwd(), reqPath);
      try {
        return snowpack.getUrlForFile(sourcePath, config);
      } catch {
        return;
      }
    },
  };
};
