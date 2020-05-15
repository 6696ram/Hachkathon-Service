import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import { Routes } from './routes/routes';
const env = process.env.NODE_ENV || 'local';

// import config from `../config/local.json`;

export default class App {
    public app: express.Application;
    public traceId: string;
    public routes: Routes = new Routes();

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.routes.routes(this.app);
        this.mongoSetup();
    }

    private mongoSetup(): void {
        (mongoose as any).Promise = global.Promise;
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('debug', true);
        mongoose.set('useUnifiedTopology', true);
        mongoose.connect('mongodb://localhost:27017/audioDB', { useNewUrlParser: true }).then(() => {
            this.app.emit('Dbconnected');
            console.log('Connected to mongodb');
        });
    }
}
