import test from 'ava';
import alfyTest from 'alfy-test';

test.beforeEach(t => {
  t.context.alfy = alfyTest();
});

test(async t => {
  t.pass();
});
