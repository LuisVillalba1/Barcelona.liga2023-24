"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const dataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "luis",
    password: "villalba1password",
    database: "barcelona_liga",
    entities: []
};
exports.dataSource = new typeorm_1.DataSource(dataSourceOptions);
