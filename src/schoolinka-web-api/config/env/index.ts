import dotenv from "dotenv";
import { schema } from "./schema";
import { Validate } from "./validators";
import { ConfigTypes } from "../types";
dotenv.config();


// validate environment variables
const envVarsSchema = Validate(schema);

const { error, value: envVariables } = envVarsSchema.validate(process.env);
if (error) throw new Error(`Config validation error: ${error.message}`);

export const config: ConfigTypes = {
    env: envVariables.NODE_ENV,
    port: envVariables.PORT,
    apiDocs: envVariables.API_DOCS,
    frontendAppUrl: envVariables.FRONTEND_APP_URL,
    store: {
        database: {
            postgres: {
                dialect: envVariables.POSTGRES_DB_DIALECT,
                host: envVariables.POSTGRES_DB_HOST,
                port: envVariables.POSTGRES_DB_PORT,
                userName: envVariables.POSTGRES_DB_USER,
                password: envVariables.POSTGRES_DB_PASSWORD,
                database: envVariables.POSTGRES_DB_NAME,
                databaseUrl: envVariables.POSTGRES_DATABASE_URL,
            },
        },
    },
    credentials: {
        jwt: {
            secret: envVariables.JWT_SECRET,
            expirationInterval: envVariables.JWT_EXPIRY,
        },
    },
    client: {
        mediaClient: {
            cloudinary: {
                cloud_name: envVariables.CLOUDINARY_CLOUD_NAME,
                api_key: envVariables.CLOUDINARY_API_KEY,
                api_secret: envVariables.CLOUDINARY_API_SECRET,
            },
        },
        mailClient: {
            nodemailer: {
                authMail: envVariables.AUTH_EMAIL,
                authPassword: envVariables.AUTH_PASSWORD,
            }
        }
    },
    defaults: {
        saltWorker: envVariables.SALT_WORKER,
        mailInfo: {
            taskManagerMail: envVariables.TASK_MANAGER_MAIL,
        }
    },
    token: {
        serverPublicToken: envVariables.SERVER_PUBLIC_TOKEN,
    }
};

