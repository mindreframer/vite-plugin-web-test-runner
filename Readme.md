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