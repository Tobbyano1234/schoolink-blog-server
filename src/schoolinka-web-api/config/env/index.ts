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
    apiDocs:envVariables.API_DOCS,
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
    }
};

