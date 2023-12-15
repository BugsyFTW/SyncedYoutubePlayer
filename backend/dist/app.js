"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shutdownServer = exports.startServer = void 0;
const express_1 = __importStar(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("http");
const variables_1 = __importDefault(require("./config/variables"));
const _router_1 = __importDefault(require("./router/index"));
const app = (0, express_1.default)();
const server = new http_1.Server(app);
//const io = new SocketSever(server);
app.use((0, express_1.json)());
app.use((0, cookie_parser_1.default)());
app.use('/', (0, _router_1.default)());
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        server.listen(variables_1.default.getPort(), () => {
            console.log(`SyncedWebPlayer backend listening on port ${variables_1.default.getPort()} 🥵`);
        });
        /*io.on('connection', (socket) => {
            console.log('USER CONNECNED');
        });*/
        mongoose_1.default.Promise = Promise;
        mongoose_1.default.connect(variables_1.default.getMongoURL());
        mongoose_1.default.connection.on('error', (error) => console.log(error));
    });
}
exports.startServer = startServer;
function shutdownServer() {
    return __awaiter(this, void 0, void 0, function* () {
        //io.close();
        server.close();
        process.exit(0);
    });
}
exports.shutdownServer = shutdownServer;
exports.default = app;
//# sourceMappingURL=app.js.map