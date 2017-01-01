/**
 * Created by ljeff on 12/13/16.
 */
import config from './config.json';
import redirects from './lib/redirects.json';

global.redirects = redirects;
import redirect from './lib/redirect';
redirect(config.port);
