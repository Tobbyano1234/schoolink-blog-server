import fs from "fs";
import axios from "axios";
import https from 'https';
import multer from "multer";
import { Request } from "express";
import { v2 as cloudinaryV2 } from "cloudinary";
import stream, { ReadableOptions } from "stream";

import { config } from "../famwork-web-api/config";
import { CloudinaryImage } from "../typings/Cloudinary";

import { strongRandomString } from "./auth";

const { config: cloudConfig } = cloudinaryV2;

export const CLOUDINARYV2 = cloudinaryV2;

cloudConfig(config.client.mediaClient.cloudinary);

type ReadableStream = Buffer | string | null;
const createReadStream = (
  object: ReadableStream,
  options?: ReadableOptions
) => {
  return new MultiStream(object, options);
};

class MultiStream extends stream.Readable {
  _object: ReadableStream;

  constructor(object: ReadableStream, options?: ReadableOptions) {
    super(options);
    if (object instanceof Buffer || typeof object === "string") {
      options = options || {};
      stream.Readable.call(this, {
        highWaterMark: options.highWaterMark,
        encoding: options.encoding,
      });
    } else {
      stream.Readable.call(this, { objectMode: true });
    }
    this._object = object;
  }
  _read() {
    this.push(this._object);
    this._object = null;
  }
}

const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const fileUpload = multer({
  fileFilter(_req, file, callback) {
    if (whitelist.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(null, false);
      return callback(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

export const singleFileUploadMiddleware = fileUpload;

export const singleFileUpload = async (request: Request) => {
  const streamUpload = (req: Request) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinaryV2.uploader.upload_stream(
        (error: any, result: any) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      createReadStream(req.file!.buffer).pipe(stream);
    });
  };

  // https://stackoverflow.com/questions/60408575/how-to-validate-file-extension-with-multer-middleware
  // https://github.com/sindresorhus/file-type/issues/535#issuecomment-1065952695
  const { fileTypeFromStream } = await (eval('import("file-type")') as Promise<
    typeof import("file-type")
  >);
  if (!request.file) throw new Error("file not included in request");
  const stream = createReadStream(request.file.buffer);
  const meta = (await fileTypeFromStream(stream))!;
  if (!whitelist.includes(meta.mime))
    throw new Error(`${meta.mime} file is not allowed`);

  return (await streamUpload(request)) as CloudinaryImage;
};

export const multFileUpload = async <T>(files: any) => {
  let streamUpload = (file: Express.Multer.File) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinaryV2.uploader.upload_stream(
        (error: any, result: any) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      createReadStream(file.buffer).pipe(stream);
    });
  };

  const imageMap: Map<T, CloudinaryImage> = new Map();
  await Promise.all(
    Object.keys(files).map(async (filename) => {
      const _file = files[filename][0];
      imageMap.set(
        filename as unknown as T,
        (await streamUpload(_file)) as CloudinaryImage
      );
      return imageMap;
    })
  );

  return imageMap;
};



export const fetchDataImageFromImageURL = async (url: string) => {
  let data = "";
  try {
    const resp = await axios.get(url);

    const filename = `${strongRandomString(4)}.png`;
    const file = fs.createWriteStream(filename);
    const getData = (): Promise<string> => new Promise(resolve => {
      https.get(resp.request.res.responseUrl, function(response) {
        response.pipe(file);
  
        file.on("finish", async () => {
            file.close();
            console.log("Download Completed");
            
            const {fileTypeFromFile} = await (eval('import("file-type")') as Promise<typeof import("file-type")>);
            const fileType = await fileTypeFromFile(filename);
            const content = fs.readFileSync(filename, 'base64');
            if (fileType) {
              data = `data:${fileType.mime};base64,` + content;
              resolve(data);

              if (data){
                fs.unlink(filename, (err) => {
                  if (err) throw err;
                  console.log(`${filename} was deleted`);
                });
              }
            }
  
        });
      });
    });
    data = await getData();

  } catch (error) {
    console.error("")
  }
  return data;
}
