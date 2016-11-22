var util                        = require('util');
var RequestResponseController   = require('castv2-client').RequestResponseController;

function WebController(client, sourceId, destinationId) {
  RequestResponseController.call(this, client, sourceId, destinationId, 'urn:x-cast:' + WebController.APP_URN);
  this.once('close', onclose);
  var self = this;
  function onclose() {
    self.stop();
  }
}

util.inherits(WebController, RequestResponseController);

WebController.prototype.load = function(uri, refreshRate) {
  var data = {
    type: 'load',
    url: uri,
    refresh: refreshRate || 0
  };
  this.request(data);
};

module.exports = WebController;
