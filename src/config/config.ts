import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/seminari5';

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
