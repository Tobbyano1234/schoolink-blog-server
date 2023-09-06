

// function read(msg) {
//   console.log(msg);
// }

// read('hello dolapo');
// read('hello timi');
// read('hello luke');
// read('hello tobi');
// // internally 
// function readDolapo() {
//   // 
// }

// function readDolapo() {
//   // 
// }
// function readDolapo() {
//   // 
// }
// function readDolapo() {
//   // 
// }

// const helloObj = {
//   'timi': () => 'timi',
//   'dolapo': () => 'dolapo',
//   'luke': () => 'luke',
//   'tobi': () => 'tobi',
// };
// function read2(msg, name) {
//   console.log(msg + ' ' + helloObj[name]);
// }

// read2('hello', 'dolapo');
// read2('hello', 'timi');
// read2('hello', 'luke');
// read2('hello', 'tobi');




const events = {
  'event1' : []
}

const EE = {
  on(event, listener) {
    events[event].push(listener);
  },
  emit(event, ...args) {
    events[event].forEach(
      (fn) => {
        console.log(
          fn(...args)
        );
      }
    )
  }
}

function add(x, y){return x + y}
function minus(x, y){return x - y}

console.log(events);

EE.on("topic:subscribe:likes:wohID", () => {})
EE.on("topic:subscribe:likes:wohID", () => {})
EE.on("topic:subscribe:likes:wohID", () => {})
EE.on("topic:subscribe:likes:wohID", () => {})

EE.on('event2', minus);
EE.on('event3', minus);
EE.on('event4', minus);
EE.on('event5', minus);

console.log(events);

EE.emit('event1', 5, 6);

EE.on('msgEvent', () => {});
EE.emit('msgEvent', "topic:subscribe:likes:wohID");
EE.emit('msgEvent', "topic:unsubscribe:likes:wohID");
EE.emit('msgEvent', "topic:funsubscribe:likes:wohID");
