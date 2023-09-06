
// randomString.ts
import { customAlphabet } from "nanoid";
// const nanoId = require("nanoid");
// const { customAlphabet } = nanoId;

interface randomArgs {
  ALPHABET?: string;
  ID?: number;
}

export const randomString = ({ ALPHABET, ID }: randomArgs) => {
  ALPHABET = ALPHABET || "abcdefghijklmnopqrstuvwxyz";
  ID = ID || 10;
  const nanoId = customAlphabet(ALPHABET, ID)();
  return nanoId;
};

export const strongRandomString = (length: number) => {
  return randomString({
    ALPHABET: "0123456789abcdefghijklmnopqrstuvwxyz",
    ID: length,
  });
};








// // randomString.ts
// interface randomArgs {
//   ALPHABET?: string;
//   ID?: number;
// }

// export const randomString = async ({ ALPHABET, ID }: randomArgs) => {
//   ALPHABET = ALPHABET || "abcdefghijklmnopqrstuvwxyz";
//   ID = ID || 10;

//   // Use dynamic import to load nanoid as an ES module
//   const { customAlphabet } = await import("nanoid");
//   const nanoId = customAlphabet(ALPHABET, ID)();
//   return nanoId;
// };

// export const strongRandomString = async (length: number) => {
//   // const { customAlphabet } = await import("nanoid");
//   return await randomString({
//     ALPHABET: "0123456789abcdefghijklmnopqrstuvwxyz",
//     ID: length,
//   });
// };









// import { customAlphabet } from "nanoid";

// interface randomArgs {
//   ALPHABET?: string;
//   ID?: number;
// }

// export const randomString = ({ ALPHABET, ID }: randomArgs) => {
//   /**
//    * Use 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz' as ALPHABET
//    * for better randomization.
//    */
//   ALPHABET = ALPHABET || "abcdefghijklmnopqrstuvwxyz";
//   ID = ID || 10;
//   const nanoId = customAlphabet(ALPHABET, ID)();
//   return nanoId;
// };

// export const strongRandomString = (length: number) => {
//   return randomString({
//     ALPHABET: "0123456789abcdefghijklmnopqrstuvwxyz",
//     ID: length,
//   });
// };

