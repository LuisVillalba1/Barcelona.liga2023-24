"use strict";
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
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const db_1 = require("./db/db");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        yield db_1.dataSource.initialize();
        console.log("connection a la base de datos completada");
        const PUERTO = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
        app_1.default.listen(PUERTO, () => {
            console.log(`servidor escuchando en el puerto ${PUERTO}`);
        });
    }
    catch (e) {
        console.log(e);
    }
});
main();
