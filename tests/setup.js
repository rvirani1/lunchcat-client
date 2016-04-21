import chai from 'chai';
import chaiImmutable from 'chai-immutable';

var jsdom = require('node-jsdom');

var doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
var win = doc.defaultView;
global.document = doc;
global.window = win;

propogateToGlobal(win);

function propogateToGlobal(window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key];
  }
}

chai.use(chaiImmutable);
