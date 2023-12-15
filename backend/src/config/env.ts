import { config as configdotenv } from "dotenv";

const REQUIRED_ENV_VARS = [
	"APP_SECRET",
	"DB_USER",
	"DB_PASSWORD"
];

export default () => {
	configdotenv();

	assertRequiredVariables();
}

const assertRequiredVariables = () => {
	REQUIRED_ENV_VARS.forEach(envVar => {
		if (!process.env[envVar]) {
			throw new Error(`Required env variable ${envVar} not defined`);
		}
	});
}