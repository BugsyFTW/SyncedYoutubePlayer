import express, { json } from 'express';
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { Server } from 'http';

import initSocketServer from "@realtime";
import variables from "@config/variables";
import router from '@router';

const app = express();
const server = new Server(app);
const io = initSocketServer(server);

app.use(json());
app.use(cookieParser());
app.use('/', router());

export async function startServer() {
    server.listen(variables.getPort(), () => {
        console.log(`SyncedWebPlayer backend listening on port ${variables.getPort()} 🥵`);
    });
    
    mongoose.Promise = Promise;
    mongoose.connect(variables.getMongoURL());
    mongoose.connection.on('error', (error: Error) => console.log(error));
}

export async function shutdownServer() {
    io.close();
    server.close();
    process.exit(0);
}

export default app;