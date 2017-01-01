let redirector = 'http://localhost:9006/';

export const environment = {
  production: true,
  getRedirects: `${redirector}redirect-ui`,
  addRedirect: `${redirector}redirect-add`,
  updateRedirect: `${redirector}redirect-update`,
  deleteRedirect: `${redirector}redirect-delete`
};
