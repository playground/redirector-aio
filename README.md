# redirector

Redirector is a node service that will redirect urls that are listed in redirects.json
RedirectorUI https://github.com/TheWeatherCompany/redirector-ui.git is used to add/update/remove url redirects.  In the future, will support other asset types redirects.
RedirectorUI manipulates redirects.json file that resides in Redirector
When a redirect url is added or modified, redirects.json will be updated 


# RedirectorUi

This project uses ng cli version 1.0.0-beta.22-1.
RedirectorUI is used to add/update/remove url redirects.  In the future, will support other asset types redirects.
RedirectorUI manipulates redirects.json file that resides in Redirector which is a node service https://github.com/TheWeatherCompany/redirector.git
When a redirect url is added or modified, redirects.json will be updated 

## Development server
Run `npm start` for a dev server. 
    - Navigate to `http://localhost:9003/`. Add/Update/Delete url's to be directed.  The app will automatically reload if you change any of the source files.
    - Navigate to `http://localhost:9006/original-url` to verify it's being redirected.

## Unit test
ng test

## e2e test
ng e2e