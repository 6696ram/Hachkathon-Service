import config from './config/local.json';
import Logger from './Logger';
import App from './source/app';
const port = config.port;
const app = new App().app;

const server = app.listen(port, () => {
    Logger.info(`server is listening on ${port}`);
    return console.log(`server is listening on ${port}`);
});

export default server;
