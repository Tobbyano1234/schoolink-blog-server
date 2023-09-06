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
            mongodb: {
                mongooseDebug: envVariables.MONGOOSE_DEBUG,
                uri: envVariables.MONGO_HOST,
                secureHost: envVariables.MONGO_SECURE_HOST,
                testUri: envVariables.MONGO_HOST_TEST,
            },
        },
    }
};

