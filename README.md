### castv2-web
Cast sender that sends a url togheter to a refresh rate to be show a web in a cast screen. For now works with the receiver developed by [boombatower](https://github.com/boombatower), that will be [chromecast-dashboard](https://github.com/boombatower/chromecast-dashboard/).

### Sample

```javascript
var Client                = require('castv2-client').Client;
var Web                   = require('castv2-web').Web;
var mdns                  = require('mdns');

var browser = mdns.createBrowser(mdns.tcp('googlecast'));

browser.on('serviceUp', function(service) {
  console.log('Found device ',service.name, ' at ', service.addresses[0], ':', service.port);
  ondeviceup(service.addresses[0]);
  browser.stop();
});

browser.start();

function ondeviceup(host) {
  var client = new Client();
  client.connect(host, function() {
    console.log('Connected');
    client.launch(Web, function(err, manager) {
      console.log('Dashboard Launched');
      manager.load('https://www.npmjs.com/package/castv2-web');
    });
  });
}

```

You can set a refresh rate, so that the receiver will update every X seconds
`manager.load(url, 10`);

### Limitations
Note that this receiver has a limitation around the frame-ancestors directive and X-Frame-Options header. So the webpages that don't like being embeded in a ifram won't show.

### Ubuntu/Debian
Due to incompatibilities of node-mdns with Ubuntu/Debian (issues with Raspberry Pi and Ubuntu 14.04) I recomend using the mdns-js implementation for discovery. The same example it will be:

```javascript
var Client                = require('castv2-client').Client;
var Web                   = require('castv2-web').Web;
var mdns = require('mdns-js');

var browser = mdns.createBrowser('_googlecast._tcp');

browser.on('ready', function () {
    console.log('ready');
    browser.discover();
});

browser.on('update', function (data) {
    ondeviceup(data.addresses[0]);
    browser.stop();
});

function ondeviceup(host) {
  var client = new Client();
  client.connect(host, function() {
    console.log('Connected');
    client.launch(Web, function(err, manager) {
      console.log('Dashboard Launched');
      manager.load('https://www.npmjs.com/package/castv2-web');
    });
  });
}
```


### Installation

`npm install castv2-web`
