'use strict';
const alfy = require('alfy');
const alfredNotifier = require('alfred-notifier');

alfredNotifier();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const host = alfy.config.get('grafana.host') || 'localhost';
const port = alfy.config.get('grafana.port') || 80;

if (port !== 80) {
  host += `:${port}`
}

const options = {
  method: 'GET',
  query: {
    query: alfy.input
  },
  maxAge: 300000
};

alfy.fetch(`${host}/api/search`, options).then(data => {
  const items = data
    .map(x => ({
      title: x.title,
      arg: `${host}/dashboard/${x.uri}`
    }));

  alfy.output(items);
});
