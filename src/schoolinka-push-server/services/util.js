"topic:subscribe:likes:wohID"
"topic:subscribe:retweets:wohID"
"topic:subscribe:replies:wohID"
"topic:subscribe:views:wohID"

"topic:unsubscribe:likes:wohID"
"topic:unsubscribe:retweets:wohID"
"topic:unsubscribe:replies:wohID"
"topic:unsubscribe:views:wohID"

// const EventEmitter = require("events")

// SIMPLE form
const messageTree = {
  "sys": {},
  "topic": {
    "subscribe": {
      "likes": {
        expectVar: true,
        behaviour: (tweetID, userID) => {
          
        }
      },
      "retweets": {
        expectVar: true,
        behaviour: () => {}
      },
      "replies": {
        expectVar: true,
        behaviour: () => {}
      },
      "views": {
        expectVar: true,
        behaviour: () => {}
      },
    },
    "unsubscribe": {
      "likes": {
        expectVar: true,
        behaviour: () => {}
      },
      "retweets": {
        expectVar: true,
        behaviour: () => {}
      },
      "replies": {
        expectVar: true,
        behaviour: () => {}
      },
      "views": {
        expectVar: true,
        behaviour: () => {}
      },
    }
  },
};

// messageTree["topic"]["subscribe"]["likes"]

// TODO: change the name
// socketMessage ---> "topic:unsubscribe:views:wohID" 
// ??? is the message in our message tree
// can we respond to this message?
const parseSocketMessage = (socketMessage) => {
  // add context from the message tree 
  // topic:unsubscribe:views:wohID
  // ['topic', 'unsubscribe', 'views', 'wohID']
  // messageTree["topic"]["unsubscribe"]["views"]
  const messageList = socketMessage.split(":");
  if (!messageList.length) return false;
  
  let msgDepth = messageTree;
  for (const message of messageList){
    // refactor this
    let _msgDepth = msgDepth[message];
    msgDepth = msgDepth[message] || msgDepth; // ignore this error
    if (!msgDepth) return false; // error
    if (!_msgDepth) return !!msgDepth.expectVar;
  }
  return true;
};

// validation
[
  "topic:subscribe:likes:wohID", // client
  "topic:subscribe:retweets:wohID",
  "topic:subscribe:replies:wohID",
  "topic:subscribe:views:wohID",
  "topic:unsubscribe:likes:wohID",
  "topic:unsubscribe:retweets:wohID",
  "topic:unsubscribe:replies:wohID",
  "topic:unsubscribe:views:wohID",
  "topic:unsubscribe:view:wohID",
].forEach(
  (val) => console.log(
    parseSocketMessage(val)
  )
);

// class MyEventEmitter extends EventEmitter {}

// function eventHandler(){
//   console.log('an event occurred!');
// }
// MyEventEmitter.on("event1", eventHandler);
// MyEventEmitter.on("event1", eventHandler);
// MyEventEmitter.on("event1", eventHandler);
// MyEventEmitter.on("event2", eventHandler);
// MyEventEmitter.on("event2", eventHandler);
// MyEventEmitter.on("event1", eventHandler);


// // internally private 
// const listOfHandlers = []; // [h1,h2, h3, ...]
// listOfHandlers.push(eventHandler);

// // private
// const obj = {
//   'event1': [], // list of handlers
//   'event2': [],
//   'event3': [],
//   'event4': [],
// };

// // public
// MyEventEmitter.emit("event1");

// // basically most apis extend event emitter
// // request.on();
