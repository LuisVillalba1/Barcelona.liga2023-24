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
exports.queryOrdenarTarjetas = exports.crearNuevaTarjeta = exports.verificarJugador = exports.verificarPartido = exports.verificarColor = void 0;
const db_1 = require("../db/db");
const tarjetas_1 = require("../entity/tarjetas");
const enum_1 = require("../enum");
const utils_1 = require("./utils");
const verificarColor = (object) => {
    if ("Color" in object) {
        if ((0, utils_1.isString)(object.Color)) {
            if (Object.values(enum_1.TiposTarjeta).includes(object.Color)) {
                return object.Color;
            }
            throw new Error("Lo siento no se encuentra el tipo de tarjeta pasada, solo se aceptan Amarilla o Roja");
        }
        throw new Error("Formato de tarjeta no valido");
    }
    throw new Error("No se encuentra la propiedad Color");
};
exports.verificarColor = verificarColor;
const verificarPartido = (object) => {
    if ("PartidoID" in object) {
        if ((0, utils_1.isNumber)(object.PartidoID)) {
            return object.PartidoID;
        }
        throw new Error("Formato de PartidoID no valido");
    }
    throw new Error("No se encuentra la propiedad PartidoID");
};
exports.verificarPartido = verificarPartido;
const verificarJugador = (object) => {
    if ("JugadorID" in object) {
        if ((0, utils_1.isNumber)(object.JugadorID)) {
            return object.JugadorID;
        }
        throw new Error("Formato de JugadorID no valido");
    }
    throw new Error("No se encuentra la propiedad JugadorID");
};
exports.verificarJugador = verificarJugador;
const crearNuevaTarjeta = (object) => {
    const nuevaTarjeta = {
        Color: (0, exports.verificarColor)(object),
        PartidoID: (0, exports.verificarPartido)(object),
        JugadorID: (0, exports.verificarJugador)(object)
    };
    return nuevaTarjeta;
};
exports.crearNuevaTarjeta = crearNuevaTarjeta;
const queryOrdenarTarjetas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tarjetasRepository = db_1.dataSource.getRepository(tarjetas_1.Tarjetas);
        const tarjetas = yield tarjetasRepository.find({
            relations: {
                Jugador: true,
                Partido: true
            }
        });
        if (tarjetas.length > 0) {
            if (req.query.ordenar == "jugadores") {
                return res.json(tarjetas.sort((a, b) => a.Jugador.JugadorID - b.Jugador.JugadorID));
            }
            if (req.query.ordenar == "tarjetas") {
                return res.json(tarjetas.sort((a, b) => {
                    const colorOrden = { Amarilla: 1, Roja: 2 };
                    return colorOrden[a.color] - colorOrden[b.color];
                }));
            }
            return res.json({
                message: "Query no encontrada"
            });
        }
        return res.json({
            message: "No se ha encontrado ninguna tarjeta por el momento"
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
exports.queryOrdenarTarjetas = queryOrdenarTarjetas;
