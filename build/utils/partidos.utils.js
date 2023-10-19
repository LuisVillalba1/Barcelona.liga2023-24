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
exports.queryOrdenarPartidos = exports.crearNuevoPartido = exports.verificarEstadioJugado = exports.verificarFecha = exports.verificarGolesRival = exports.verificarRivalID = void 0;
const db_1 = require("../db/db");
const partidos_1 = require("../entity/partidos");
const utils_1 = require("./utils");
const verificarRivalID = (object) => {
    if ("RivalID" in object) {
        if ((0, utils_1.isNumber)(object.RivalID)) {
            return object.RivalID;
        }
        throw new Error("Formato de RivalID no valido");
    }
    throw new Error("No se ha encontrado la propiedad RivalID");
};
exports.verificarRivalID = verificarRivalID;
const verificarGolesRival = (object) => {
    if ("GolesRival" in object) {
        if ((0, utils_1.isNumber)(object.GolesRival)) {
            return object.GolesRival;
        }
        throw new Error("Formato de GolesRival no valido");
    }
    throw new Error("No se ha encontrado la propiedad GolesRival");
};
exports.verificarGolesRival = verificarGolesRival;
const verificarFecha = (object) => {
    if ("Fecha" in object) {
        if ((0, utils_1.isFecha)(object.Fecha)) {
            return object.Fecha;
        }
        else {
            throw new Error("Formato de fecha no valida, se aceptan formatos de tipo date, por ejemplo: 2023-08-24");
        }
    }
    throw new Error("No se encuentra la propiedad Fecha");
};
exports.verificarFecha = verificarFecha;
const verificarEstadioJugado = (object) => {
    if ("EstadioJugado" in object) {
        if ((0, utils_1.isString)(object.EstadioJugado)) {
            return object.EstadioJugado;
        }
        throw new Error("Formato de EstadioJugado no valido");
    }
    throw new Error("No se encuentra la propiedad EstadioJugado");
};
exports.verificarEstadioJugado = verificarEstadioJugado;
const crearNuevoPartido = (object) => {
    const nuevoPartido = {
        RivalID: (0, exports.verificarRivalID)(object),
        GolesRival: (0, exports.verificarGolesRival)(object),
        Fecha: (0, exports.verificarFecha)(object),
        EstadioJugado: (0, exports.verificarEstadioJugado)(object)
    };
    return nuevoPartido;
};
exports.crearNuevoPartido = crearNuevoPartido;
const queryOrdenarPartidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partidoRepository = db_1.dataSource.getRepository(partidos_1.Partidos);
        const partidos = yield partidoRepository.find({
            relations: {
                Goles: true,
                Rival: true
            }
        });
        if (partidos.length > 0) {
            if (req.query.mostrar == "ganados") {
                const ganados = partidos.filter((a) => a.Goles.length > a.GolesRival);
                if (ganados.length > 0) {
                    return res.json(ganados);
                }
                return res.json({
                    message: "No se ha encontrado ningun partido ganado por el momento"
                });
            }
            if (req.query.mostrar == "perdidos") {
                const perdidos = partidos.filter((a) => a.Goles.length < a.GolesRival);
                if (perdidos.length > 0) {
                    return res.json(perdidos);
                }
                return res.json({
                    message: "No se ha encontrado ningun partido perdido por el momento"
                });
            }
            if (req.query.mostrar == "empatados") {
                const empatados = partidos.filter((a) => a.Goles.length == a.GolesRival);
                if (empatados.length > 0) {
                    return res.json(empatados);
                }
                return res.json({
                    message: "No se ha encontrado ningun partido empatado por el momento"
                });
            }
            return res.json({
                message: "Query no encontrada"
            });
        }
        return res.json({
            message: "No hay ningun partido por el momento"
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
exports.queryOrdenarPartidos = queryOrdenarPartidos;
