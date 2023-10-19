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
exports.pathJugador = exports.putJugador = exports.getJugadores = exports.getJugadorID = exports.postJugadores = void 0;
const jugadores_utils_1 = require("../utils/jugadores.utils");
const jugadores_1 = require("../entity/jugadores");
const db_1 = require("../db/db");
const utils_1 = require("../utils/utils");
const postJugadores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jugador = (0, jugadores_utils_1.crearNuevoJugador)(req.body);
        const nuevoJugador = new jugadores_1.Jugadores();
        nuevoJugador.Nombre_apellido = jugador.Nombre_apellido;
        nuevoJugador.Camiseta = jugador.Camiseta;
        nuevoJugador.EnClub = jugador.Enclub;
        yield db_1.dataSource.manager.save(nuevoJugador);
        return res.json(nuevoJugador);
    }
    catch (e) {
        if (e instanceof Error) {
            return res.status(404).json({
                message: e.message
            });
        }
        else {
            return res.json({
                message: "Error desconocido"
            });
        }
    }
});
exports.postJugadores = postJugadores;
const getJugadorID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, utils_1.getDataIDRepository)(req, res, jugadores_1.Jugadores, "JugadorID", "jugador", []);
});
exports.getJugadorID = getJugadorID;
const getJugadores = (res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, utils_1.getDataRepository)(res, jugadores_1.Jugadores, "jugador", []);
});
exports.getJugadores = getJugadores;
const putJugador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playerRespository = db_1.dataSource.getRepository(jugadores_1.Jugadores);
        const { id } = req.params;
        const jugador = yield playerRespository.findOneBy({
            JugadorID: parseInt(id)
        });
        if (jugador) {
            const nuevoJugador = (0, jugadores_utils_1.crearNuevoJugador)(req.body);
            jugador.Nombre_apellido = nuevoJugador.Nombre_apellido;
            jugador.Camiseta = nuevoJugador.Camiseta;
            jugador.EnClub = nuevoJugador.Enclub;
            yield playerRespository.save(jugador);
            return res.json({
                message: "Jugador actualizado con exito"
            });
        }
        return res.json({
            message: "No se ha encontrado ningun jugador"
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
exports.putJugador = putJugador;
const pathJugador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playerRespository = db_1.dataSource.getRepository(jugadores_1.Jugadores);
        const { id } = req.params;
        const jugador = yield playerRespository.findOneBy({
            JugadorID: parseInt(id)
        });
        if (jugador) {
            const { Nombre_apellido, Camiseta, Enclub } = req.body;
            if (Nombre_apellido !== undefined) {
                if (typeof Nombre_apellido == "string") {
                    jugador.Nombre_apellido = Nombre_apellido;
                }
                else {
                    throw new Error("El formato del nombre y apellido no es correcto");
                }
            }
            if (Camiseta !== undefined) {
                if (typeof Camiseta == "number") {
                    jugador.Camiseta = Camiseta;
                }
                else {
                    throw new Error("Camiseta invalida");
                }
            }
            if (Enclub !== undefined) {
                jugador.EnClub = (0, utils_1.isBoolean)(Enclub);
            }
            yield playerRespository.save(jugador);
            return res.json({
                message: "Jugador actualizado con exito"
            });
        }
        return res.json({
            message: "No se ha encontrado ningun jugador"
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
exports.pathJugador = pathJugador;
