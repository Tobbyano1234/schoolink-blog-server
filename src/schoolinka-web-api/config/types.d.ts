export type ConfigTypes = {
    env: string;
    port: number;
    apiDocs: string;
    frontendAppUrl: string;
    store: {
        database: {
            postgres: IPostgres;
        };
    };
    credentials: {
        jwt: IJWT;
    },
    client: {
        mediaClient: {
            cloudinary: ICloudinary;
        },
        mailClient: {
            nodemailer: INodemailer;
        }
    }
    defaults: {
        saltWorker: number;
        mailInfo: {
            taskManagerMail: string;
        }
    }
    token: {
        serverPublicToken: string;
    }
};

interface ICloudinary {
    cloud_name: string;
    api_key: string;
    api_secret: string;
}
interface INodemailer {
    authMail: string;
    authPassword: string;
}
interface IJWT {
    secret: string;
    expirationInterval: string;
}

interface IPostgres {
    dialect: string;
    host: string;
    port: number;
    userName: string;
    password: string;
    database: string;
    databaseUrl: string;
}

export interface ErrorResponseInterface {
    message: string;
    errors: string;
    stack: string | undefined;
    statusCode: number;
    payload?: object | null;
}

export interface ExpressErrorInterface extends Error {
    errors: string;
    status: number;
}