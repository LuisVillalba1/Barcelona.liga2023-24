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
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryOrdenarGoles = exports.crearNuevoGol = exports.verificarMinuto = exports.verificarPartido = exports.verificarJugadorID = void 0;
const db_1 = require("../db/db");
const goles_1 = require("../entity/goles");
const utils_1 = require("./utils");
const verificarJugadorID = (object) => {
    if ("JugadorID" in object) {
        if ((0, utils_1.isNumber)(object.JugadorID)) {
            return object.JugadorID;
        }
        throw new Error("Formato de JugadorID no valido");
    }
    throw new Error("No se encuentra la propiedad JugadorID");
};
exports.verificarJugadorID = verificarJugadorID;
const verificarPartido = (object) => {
    if ("PartidoID" in object) {
        if ((0, utils_1.isNumber)(object.PartidoID)) {
            return object.PartidoID;
        }
        throw new Error("Formato de PartidoID no valido");
    }
    throw new Error("No se encuentra la PartidoID");
};
exports.verificarPartido = verificarPartido;
const verificarMinuto = (object) => {
    if ("Minuto" in object) {
        if ((0, utils_1.isMinuto)(object.Minuto)) {
            return object.Minuto;
        }
        throw new Error("Formato de minuto no valido, los formatos validos son por ejemplo(09:10,105:00)");
    }
    throw new Error("No se encuentra la propiedad Minuto");
};
exports.verificarMinuto = verificarMinuto;
const crearNuevoGol = (object) => {
    const nuevoGol = {
        JugadorID: (0, exports.verificarJugadorID)(object),
        PartidoID: (0, exports.verificarPartido)(object),
        Minuto: (0, exports.verificarMinuto)(object)
    };
    return nuevoGol;
};
exports.crearNuevoGol = crearNuevoGol;
const queryOrdenarGoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const golesRepository = db_1.dataSource.getRepository(goles_1.Goles);
        const goles = yield golesRepository.find({
            relations: {
                Jugador: true,
                Partido: true
            }
        });
        if (req.query.ordenar == "jugadores") {
            return res.json(goles.sort((a, b) => a.Jugador.JugadorID - b.Jugador.JugadorID));
        }
        return res.json({
            message: "Query no encontrada"
        });
    }
    catch (e) {
        if (e instanceof Error) {
            return res.json({
                message: e.message
            });
        }
        return res.json({
            message: "Error desconocido"
        });
    }
});
exports.queryOrdenarGoles = queryOrdenarGoles;
