/**
 * Created by ljeff on 12/13/16.
 */

import express from 'express';
import bodyParser from'body-parser';
import url from 'url';
import cors from 'cors';
import jsonfile from 'jsonfile';

import logger from './logger';

jsonfile.spaces = 2;

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(errorHandler);
app.disable('etag');
app.set('etag', false);

function errorHandler (err, req, res, next) {
  res.status(500)
  res.send({ error: err })
}

function updateFile(redirect, remove, next) {
  let json;
  let filename = `${__dirname}/redirects.json`;
  const action = remove ? 'deleted' : 'updated';

  return new Promise((resolve) => {
    jsonfile.readFile(filename, (err, obj) => {
      if(err) {
        return next(err);
      }
      if(remove) {
        json = obj.filter((item) => item.id !== redirect.id);
      } else {
        json = obj.map((item) => {
          return item.id === redirect.id ? redirect : item;
        });
      }
      jsonfile.writeFile(filename, json, function (err) {
        if(err) {
          logger.error(`Error ${action} redirect`, {
            id: redirect.id,
            ruleName: redirect.ruleName
          });
          return next(err);
        } else {
          logger.info(`Successfully ${action} redirect`, {
            fileName: `${__dirname}/redirects.json`,
            id: redirect.id,
            ruleName: redirect.ruleName
          });
          global.redirects = json;
          resolve(redirect);
        }
      });
    });
  });
}

export default function(port) {
  app.get('/redirect-ui', function(req, res) {
    logger.info(`get redirects from file`, {
      fileName: `${__dirname}/redirects.json`
    });
    jsonfile.readFile(`${__dirname}/redirects.json`, (err, obj) => {
      res.json(obj);
    });
  });
  app.post('/redirects-save', function(req, res, next) {
    let redirects = req.body;
    let filename = `${__dirname}/redirects.json`;
    jsonfile.writeFile(filename, redirects, function (err) {
      if(err) {
        return next(err);
      } else {
        res.send({data: redirect});
      }
    });
  });
  app.post('/redirect-add', function(req, res, next) {
    let redirect = req.body;
    let json;
    let filename = `${__dirname}/redirects.json`;

    jsonfile.readFile(filename, (err, obj) => {
      if(err) {
        return next(err);
      }
      obj.push(redirect);
      jsonfile.writeFile(filename, obj, function (err) {
        if(err) {
          return next(err);
        } else {
          res.send({data: redirect});
        }
      });
    });
  });
  app.post('/redirect-update/:id', function(req, res, next) {
    let redirect = req.body;
    updateFile(redirect, false, next)
      .then((data) => {
        res.send({data: data});
      });
  });

  app.post('/redirect-delete/:id', function(req, res, next) {
    let redirect = req.body;
    updateFile(redirect, true, next)
      .then((data) => {
        res.send({data: data});
      });
  });

  app.get('*', function (req, res, next) {
    let redirects = global.redirects;
    let redirect;
    let path = url.parse(req.url).pathname;
    let requestHost = 'https://wunderground.com';

    console.log('test', redirects)
    if (path) {
      let index = redirects.findIndex((redirect) => redirect.path === path);
      console.log('***', index)
      if(index >= 0) {
        redirect = redirects[index];
      }
      console.log('***??', index, redirect, path, requestHost)
    }

    if (!redirect){
      redirect = redirects['*'];
      console.log('*****', redirect, path, requestHost)
    }

    if (redirect){
      let redirectUrl = requestHost + redirect.redirectUrl;
      console.log('*****', redirectUrl)

      res.statusCode = redirect.redirectCode || 301;
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Location', redirectUrl);
      res.end(`Redirecting to ${redirectUrl}`);
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Redirect not found');
    }
  }).listen(port, () => {
    console.log(`redirect running on port ${port}`);
  });
}
