"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbName = exports.dbHost = exports.dbPassword = exports.dbPort = exports.dbUser = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.dbUser = process.env.DB_USER || "luis";
exports.dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;
exports.dbPassword = process.env.DB_PASSWORD || "villalba1password";
exports.dbHost = process.env.DB_HOST || "localhost";
exports.dbName = process.env.DB_NAME || "barcelona_liga";
