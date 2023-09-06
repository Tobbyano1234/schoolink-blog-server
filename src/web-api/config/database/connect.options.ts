import { SequelizeOptions } from 'sequelize';

export const LiveDBConnectOptions: SequelizeOptions = {
    dialect: 'postgres', // Replace with your preferred database dialect (e.g., 'mysql', 'postgres', 'sqlite')
    host: 'live-db-hostname',
    port: 3306, // Replace with your database port
    username: 'live-db-username',
    password: 'live-db-password',
    database: 'live-db-name',
    logging: true, // Set to true to log SQL queries (optional)
};

export const MockDBConnectOptions: SequelizeOptions = {
    dialect: 'sqlite', // Use SQLite for a mock database
    storage: ':memory:', // Use in-memory storage for the mock database
    logging: false, // Disable SQL query logging for the mock database (optional)
};
