const Y = require('yjs');
const data = require('./anon_slow_2.json');

console.log('number of updates', data.length);

const doc = new Y.Doc();
let applied = 0;
const start = Date.now();
for (const update of data) {
  try {
    const startSingle = Date.now();
    Y.applyUpdate(doc, Buffer.from(update, 'base64'));
    console.log('applied', ++applied, 'in', Date.now() - startSingle, 'ms');
  } catch (e) {
    console.log('threw, current number of transactions:', doc._transactionCleanups.length);
    throw e;
  }
}
console.log(Date.now() - start);
console.log(data[0].length, Y.encodeStateAsUpdate(doc).length)
console.log([...Y.snapshot(doc).ds.clients.values()].map(s => s.length))
