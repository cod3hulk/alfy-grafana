'use strict';
const alfy = require('alfy');
const alfredNotifier = require('alfred-notifier');

alfredNotifier();

const host = alfy.config.get('grafana.host') || 'test';
const port = alfy.config.get('grafana.port') || 3000;
const user = alfy.config.get('grafana.user') || 'admin';
const password = alfy.config.get('grafana.password') || 'admin';
const auth = new Buffer(`${user}:${password}`).toString('base64');

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

alfy.fetch(`${host}:${port}/api/search`, options).then(data => {
  const items = data
    .map(x => ({
      title: x.title,
      arg: `${host}:${port}/dashboard/${x.uri}`
    }));

  alfy.output(items);
});
