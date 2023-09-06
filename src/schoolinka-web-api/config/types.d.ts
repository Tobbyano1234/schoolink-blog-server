export type ConfigTypes = {
    env: string;
    port: number;
    apiDocs: string;
    store: {
        database: {
            postgres: IPostgres;
        };
    };
};


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