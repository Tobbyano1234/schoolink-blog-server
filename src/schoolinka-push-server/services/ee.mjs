import { EventEmitter } from 'node:events';

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => { // listen to an event
  console.log('an event 1 occurred!');
});
myEmitter.on('event', () => { // listen to an event
  console.log('an event 2 occurred!');
});
myEmitter.on('event', () => { // listen to an event
  console.log('an event 3 occurred!');
});
myEmitter.on('event', () => { // listen to an event
  console.log('an event 4 occurred!');
});
myEmitter.emit('event'); // trigger an event
