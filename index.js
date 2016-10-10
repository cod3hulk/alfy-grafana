'use strict';
const alfy = require('alfy');
const alfredNotifier = require('alfred-notifier');

alfredNotifier();

const host = alfy.config.get('grafana.host');
const port = alfy.config.get('grafana.port');
const user = alfy.config.get('grafana.user');
const password = alfy.config.get('grafana.password');
const auth = new Buffer(user + ':' + password).toString('base64');

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + auth
  },
  query: {
    query: alfy.input
  },
  maxAge: 300000
};

alfy.fetch('http://' + host + ':' + port + '/api/search', options).then(data => {
  const items = data
    .map(x => ({
      title: x.title,
      arg: 'http://' + host + ':' + port + '/dashboard/' + x.uri
    }));

  alfy.output(items);
});
