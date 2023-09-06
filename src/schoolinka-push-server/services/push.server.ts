// import { Types } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Socket } from "socket.io";
// import { AccountTokenType } from '../../types/user';
import { UserModel } from '../../famwork-entities';
import { config } from "../../famwork-web-api/config";
import { verifyToken } from '../../famwork-auth/plugins';
import { UserRegistryModel } from './entities/UserRegistry';
import { AccountTokenType } from '../../typings/Account.types';

// context
// public_token = 'timi is a boy' // guest has
// 5do2im38n7483920k3rmt4n89vm48n35mifdiu --> user._id
type socketAuthType = {
  serverPublicToken: string;
  token?: string;
  userID?: ObjectId; // we don't need this
};

type socketDataType = {
  userID?: ObjectId; // not taking it
  userToken?: AccountTokenType;
};

export class SocketHandler {
  // 2 assumptions

  static async authTokenMiddleware(socket: Socket, next: (...args: any[]) => void) {
    // trycatch
    try {
      const { serverPublicToken, token: registeredUserToken } = socket.handshake.auth as socketAuthType;
      if (!serverPublicToken) {
        next(new Error('Socket Auth Error: no public token found'));
        throw new Error('Socket Auth Error: no public token found');
      }

      // all the gues
      console.log(config.token.serverPublicToken);
      if (serverPublicToken !== config.token.serverPublicToken) {
        next(new Error(`Socket Auth error: wrong public token`));
        throw new Error(`Socket Auth error: wrong public token`);
      }

      if (registeredUserToken) {
        // trycatch 
        const decoded = await verifyToken(registeredUserToken) as AccountTokenType;
        console.log("decoded:: ", decoded);
        // decoded._id = new Types.ObjectId(decoded._id);
        socket.data.userToken = decoded;
      }
      next();
    } catch (err: any) {
      console.log(err);
    }
  }

  static async authIdentityMiddleware(socket: Socket, next: (...args: any[]) => void) {
    try {
      const { data } = socket;
      // const {id, data} = socket;
      const { userToken } = data as socketDataType;
      // console.log({id, data}); // see on the screen

      if (!userToken) {
        next(new Error(`Socket data error: userToken required`));
        throw new Error(`Socket data error: userToken required`);
      };

      const userID = userToken._id;
      const userExists = await UserModel.findById(userID);
      if (!userExists) {
        next(new Error(`Socket identity error: user ${userID} does not exist`));
        throw new Error(`Socket identity error: user ${userID} does not exist`);
      } else {
        next();
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  static async connectionHandler(socket: Socket) {
    socket.on('message', SocketHandler.messageHandler(socket));

    console.log("am here socket")

    const { id: socketID, data } = socket;
    const { userToken } = data as socketDataType;
    const { _id: userID } = userToken!;

    // refactor this
    // subscribing and unsubscribing from a topic
    let isUserExistsInRegistry = await UserRegistryModel.findOne({ userID });
    if (isUserExistsInRegistry) {
      await UserRegistryModel.findByIdAndUpdate(
        isUserExistsInRegistry._id,
        {
          $push: {
            sockets: [{ socketID }]
          }
        }
      );
    } else {
      isUserExistsInRegistry = await UserRegistryModel.create(
        {
          userID,
          sockets: [
            { socketID }
          ]
        }
      );
    }

    socket.on('disconnecting', () => {
      (async () => {
        console.log("disconnected");
        await UserRegistryModel.findByIdAndUpdate(
          isUserExistsInRegistry?._id,
          {
            $pull: { sockets: { socketID } }
          }
        );

      })();
      // unhandled promise rejections
    });
  }

  static messageHandler(socket: Socket) {

    return function handler(_data: any): void {
      console.log("data event seen")
      console.log("data", _data)

    }

    // return function(msg: string) {
    //   const res = parseSocketMessage(msg);
    //   if (res) {
    //     console.log('correct message was sent', msg);
    //   }else {
    //     console.log('invalid message received', msg);
    //   }
    // }
  }
}

// "topic:subscribe:likes:wohID"
// "topic:subscribe:retweets:wohID"
// "topic:subscribe:replies:wohID"
// "topic:subscribe:views:wohID"

// "topic:unsubscribe:likes:wohID"
// "topic:unsubscribe:retweets:wohID"
// "topic:unsubscribe:replies:wohID"
// "topic:unsubscribe:views:wohID"

enum RootMessage {
  SYS = 'sys',
  TOPIC = 'topic',
};

enum TopicMessage {
  SUBSCRIBE = 'subscribe',
  UNSUBSCRIBE = 'unsubscribe',
}

type LeafTree = {
  expectVar: boolean,
  behaviour: () => void;
};

enum SubscribeMessage {
  LIKES = 'likes',
  RETWEETS = 'retweets',
  REPLIES = 'replies',
  VIEWS = 'views',
}

type UnsubscribeMessage = SubscribeMessage;

type SubscribeTree = {
  [key in SubscribeMessage]: LeafTree;
};

type UnsubscribeTree = {
  [key in UnsubscribeMessage]: LeafTree;
};

type TopicTree = {
  [key in TopicMessage]: SubscribeTree | UnsubscribeTree;
};

type SysTree = {};

type MessageTree = {
  [
  key in RootMessage
  ]: TopicTree | SysTree
};

const messageTree: MessageTree = {
  "sys": {},
  "topic": {
    "subscribe": {
      "likes": {
        expectVar: true,
        behaviour: () => { }
      },
      "retweets": {
        expectVar: true,
        behaviour: () => { }
      },
      "replies": {
        expectVar: true,
        behaviour: () => { }
      },
      "views": {
        expectVar: true,
        behaviour: () => { }
      },
    },
    "unsubscribe": {
      "likes": {
        expectVar: true,
        behaviour: () => { }
      },
      "retweets": {
        expectVar: true,
        behaviour: () => { }
      },
      "replies": {
        expectVar: true,
        behaviour: () => { }
      },
      "views": {
        expectVar: true,
        behaviour: () => { }
      },
    }
  },
};

export const parseSocketMessage = (socketMessage: string) => {
  // add context from the message tree 
  // topic:unsubscribe:views:wohID
  // ['topic', 'unsubscribe', 'views', 'wohID']
  // messageTree["topic"]["unsubscribe"]["views"]
  const messageList = socketMessage.split(":") as (RootMessage | TopicMessage | SubscribeMessage)[];
  if (!messageList.length) return false;

  // solution 1
  // 1 --> remove the types
  // 2 --> cast everything
  let msgDepth = messageTree as MessageTree | TopicTree | SubscribeTree | LeafTree;
  for (const message of messageList) {
    // refactor this
    let _msgDepth = (msgDepth as MessageTree)[message as RootMessage];
    msgDepth = (msgDepth as TopicTree)[message as TopicMessage] || msgDepth as LeafTree; // ignore this error
    if (!msgDepth) return false; // error
    if (!_msgDepth) return !!(msgDepth as unknown as LeafTree).expectVar; // father of casts
  }
  return true;
};

// const age = {i: 6};
// let name: string;
// name = age as unknown as string;
// runtime type errors
