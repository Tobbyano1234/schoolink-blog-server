
type MultiWait = {
  keys: string[],
  values: ((...args: any[]) => Promise<any>)[]
};

type baseObjectType =  {[key:string]: any};

export const multiwait = async <T>(MultiWait: MultiWait) => {
  const { keys, values } = MultiWait;
  if (keys.length !== values.length) throw new Error(`cannot multiwait: keys' length of ${keys.length} and values' length of ${values.length} don't match`);
  const obj: baseObjectType = {};
  const results = await Promise.all(values.map(async (fn) => await fn()));
  for (let i = 0; i < keys.length; i++){
    obj[keys[i]] = results[i];
  }
  return obj as T;
};
