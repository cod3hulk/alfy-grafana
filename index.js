'use strict';
const alfy = require('alfy');
const alfredNotifier = require('alfred-notifier');

alfredNotifier();

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic YWRtaW46YWRtaW4='
  }
}

alfy.fetch('http://localhost:3000/api/search', options).then(data => {
  const items = data
    .map(x => ({
      title: x.title,
      arg: x.uri
    }));

  alfy.output(items);
});
