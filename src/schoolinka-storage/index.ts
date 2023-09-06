import { AddAllMongoDBFields, TempStore, TempStoreModel } from "../famwork-entities";

export const tempStore = {
  set: async (key: string, value: string, expirationTime?: number) => {
    const tstore = await TempStoreModel.findOne({ key }) as AddAllMongoDBFields<TempStore>;
    if (!tstore) {
      await TempStoreModel.create(
        { key, value, expirationTime: expirationTime || 0, beginTime: new Date() });
    }else {
      await TempStoreModel.findOneAndUpdate(
        { key },
        { key, value, expirationTime: expirationTime || 0, beginTime: new Date() }
      );
    }
  },
  get: async (key: string) => {
    const tstore = await TempStoreModel.findOne({ key }) as AddAllMongoDBFields<TempStore>;
    if (!tstore) return null;
    const { value, expirationTime, beginTime } = tstore;
    if (expirationTime){
      const then = (new Date(beginTime)).getTime();
      const now = (new Date()).getTime();
      const timeElapsed = now > (then + (expirationTime * 1000));
      if (timeElapsed) return null;
    }
    return value;
  }
};
