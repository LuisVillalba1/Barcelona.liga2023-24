"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const jugadores_1 = require("../entity/jugadores");
const goles_1 = require("../entity/goles");
const partidos_1 = require("../entity/partidos");
const tarjetas_1 = require("../entity/tarjetas");
const rivales_1 = require("../entity/rivales");
const config_1 = require("./config");
const dataSourceOptions = {
    type: "mysql",
    host: config_1.dbHost,
    port: config_1.dbPort,
    username: config_1.dbUser,
    password: config_1.dbPassword,
    database: config_1.dbName,
    entities: [jugadores_1.Jugadores, goles_1.Goles, partidos_1.Partidos, tarjetas_1.Tarjetas, rivales_1.Rivales],
    synchronize: true,
    logging: false
};
exports.dataSource = new typeorm_1.DataSource(dataSourceOptions);
