const Y = require('yjs');
const data = require('./anon_stack_overflow.json');

console.log('number of updates', data.length);

const doc = new Y.Doc();
let applied = 0;
for (const update of data) {
  try {
    Y.applyUpdate(doc, Buffer.from(update, 'base64'));
    console.log('applied', ++applied);
  } catch (e) {
    console.log('threw, current number of transactions:', doc._transactionCleanups.length);
    throw e;
  }
}
