// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

let redirector = 'http://localhost:9006/';

export const environment = {
  production: false,
  getRedirects: `${redirector}redirect-ui`,
  addRedirect: `${redirector}redirect-add`,
  updateRedirect: `${redirector}redirect-update`,
  deleteRedirect: `${redirector}redirect-delete`
};
