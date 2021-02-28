## Integration for Vite and Web Test Runner



## Local dev

```bash
# based on https://classic.yarnpkg.com/en/docs/cli/link/
# first link the current folder
$ yarn link
$ cd example

# install node modules
$ yarn

# now link to the `exposed` local folder for vite-plugin-web-test-runner
$ yarn link "vite-plugin-web-test-runner"
```

Now you can edit files in the top folder and see you changes reflected in the `example` folder.

## Example folder

It is a small app with React / Typescript / Vite / WebTestRunner.
Currently for the integration with WebTestRunner I use `snowpack`, yet this is far from optimal, because it does not understand Vite.js plugins, such es WindiCSS.



## Current issues
I have difficulties to figure the the equivalent function to trigger transformation of a requested resource like in Snowpack:

```js
const result = await server.loadUrl(reqPath, { isSSR: false });
```

Vite's `await server.transformRequest(request.path, {ssr: false, html: false})` fails and I'm not sure what my alternatives here would be.
