import { startServer, shutdownServer } from "@/app"; // init function that boots server
import configureEnvVariables from "@config/env";
import { PROCESS_INTERRUPT_CODE, PROCESS_TERMINATE_CODE } from "@config/constants";

void configureEnvVariables();
void startServer();

// Gracefully stop scheduled tasks when server goes down
process.on(PROCESS_INTERRUPT_CODE, shutdownServer);
process.on(PROCESS_TERMINATE_CODE, shutdownServer);