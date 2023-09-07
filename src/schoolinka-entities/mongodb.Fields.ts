// // import { Types } from "mongoose";
// import { ObjectId } from "mongodb";

// export type MongoDbFields = {
//   "_id": ObjectId;
//   "__v": number;
//   "createdAt": Date;
//   "updatedAt": string;
// };

// export type AddAllMongoDBFields<T> = T & MongoDbFields;
// export type AddSomeMongoDBFields<T extends keyof MongoDbFields, U>= Pick<MongoDbFields, T> & U;
