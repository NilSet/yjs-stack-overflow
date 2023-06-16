const Y = require('yjs');
const data = require('./anon_slow.json');

console.log('number of updates', data.length);

const doc = new Y.Doc();
let applied = 0;
const start = Date.now();
for (const update of data) {
  try {
    Y.applyUpdate(doc, Buffer.from(update, 'base64'));
    console.log('applied', ++applied);
  } catch (e) {
    console.log('threw, current number of transactions:', doc._transactionCleanups.length);
    throw e;
  }
}
console.log(Date.now() - start);
console.log(data[0].length, Y.encodeStateAsUpdate(doc).length)
console.log([...Y.snapshot(doc).ds.clients.values()].map(s => s.length))
