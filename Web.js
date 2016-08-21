var util              = require('util');
var Application       = require('castv2-client').Application;
var WebController = require('./WebController');

function Web(client, session) {
  Application.apply(this, arguments);
  this.web = this.createController(WebController);
  var self = this;
}

Web.APP_ID = 'F7FD2183';

util.inherits(Web, Application);

Web.prototype.load = function(videoId) {
  this.web.load.apply(this.web, arguments);
};

module.exports = Web;
