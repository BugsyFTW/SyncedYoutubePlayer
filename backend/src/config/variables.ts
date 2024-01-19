const envVariables = process.env;

const variables = {
    getPort: () => envVariables.PORT,
    getMongoURL: () => `mongodb+srv://${envVariables.DB_USER}:${envVariables.DB_PASSWORD}@syncedytplayer.ikz9hco.mongodb.net/?retryWrites=true&w=majority`,
    getAppSecret: () => envVariables.APP_SECRET || '0x0',
    getCookieName: () => envVariables.COOKIE_NAME || "_session",
    getOrigin: () => "http://localhost:8080",
};

export default variables;