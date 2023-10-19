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
exports.deleteTarjeta = exports.patchTarjeta = exports.putTarjeta = exports.getTarjetaID = exports.getTarjetas = exports.postTarjetas = void 0;
const tarjetas_1 = require("../entity/tarjetas");
const tarjetas_utils_1 = require("../utils/tarjetas.utils");
const db_1 = require("../db/db");
const jugadores_1 = require("../entity/jugadores");
const partidos_1 = require("../entity/partidos");
const utils_1 = require("../utils/utils");
const postTarjetas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tarjeta = (0, tarjetas_utils_1.crearNuevaTarjeta)(req.body);
        const nuevaTarjeta = new tarjetas_1.Tarjetas();
        const jugadorRepository = db_1.dataSource.getRepository(jugadores_1.Jugadores);
        const jugador = yield jugadorRepository.findOneBy({
            JugadorID: tarjeta.JugadorID
        });
        const partidoRepository = db_1.dataSource.getRepository(partidos_1.Partidos);
        const partido = yield partidoRepository.findOneBy({
            PartidoID: tarjeta.PartidoID
        });
        if (jugador) {
            if (partido) {
                nuevaTarjeta.Jugador = jugador;
                nuevaTarjeta.Partido = partido;
                nuevaTarjeta.color = tarjeta.Color;
                db_1.dataSource.manager.save(nuevaTarjeta);
                return res.json(nuevaTarjeta);
            }
            return res.json({
                message: "No se ha encontrado el partido correspondiente"
            });
        }
        return res.json({
            message: "No se ha encontrado el jugador correspondiente"
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
exports.postTarjetas = postTarjetas;
const getTarjetas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.query).length > 0) {
        (0, tarjetas_utils_1.queryOrdenarTarjetas)(req, res);
    }
    else {
        yield (0, utils_1.getDataRepository)(res, tarjetas_1.Tarjetas, "tarjeta", ["Jugador", "Partido"]);
    }
});
exports.getTarjetas = getTarjetas;
const getTarjetaID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, utils_1.getDataIDRepository)(req, res, tarjetas_1.Tarjetas, "TarjetaID", "tarjeta", ["Jugador", "Partido"]);
});
exports.getTarjetaID = getTarjetaID;
const putTarjeta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const nuevaTarjeta = (0, tarjetas_utils_1.crearNuevaTarjeta)(req.body);
        const tarjetasRespository = db_1.dataSource.getRepository(tarjetas_1.Tarjetas);
        const tarjeta = yield tarjetasRespository.findOneBy({
            TarjetaID: parseInt(id)
        });
        if (tarjeta) {
            const jugadorRepository = db_1.dataSource.getRepository(jugadores_1.Jugadores);
            const jugador = yield jugadorRepository.findOneBy({
                JugadorID: nuevaTarjeta.JugadorID
            });
            if (jugador) {
                const partidoRepository = db_1.dataSource.getRepository(partidos_1.Partidos);
                const partido = yield partidoRepository.findOneBy({
                    PartidoID: nuevaTarjeta.PartidoID
                });
                if (partido) {
                    tarjeta.Jugador = jugador;
                    tarjeta.Partido = partido;
                    tarjeta.color = nuevaTarjeta.Color;
                    yield tarjetasRespository.save(tarjeta);
                    return res.json({
                        message: "Se ha modificado la tarjeta correctamente"
                    });
                }
                return res.json({
                    message: "No se ha encontrado el partido correspondiente"
                });
            }
            return res.json({
                message: "No se ha encontrado el jugador correspondiente"
            });
        }
        return res.json({
            message: "No se ha encontrado la tarjeta correspondiente"
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
exports.putTarjeta = putTarjeta;
const patchTarjeta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tarjetasRespository = db_1.dataSource.getRepository(tarjetas_1.Tarjetas);
        const tarjeta = yield tarjetasRespository.findOneBy({
            TarjetaID: parseInt(id)
        });
        if (tarjeta) {
            const { Color, PartidoID, JugadorID } = req.body;
            if (Color) {
                const nuevoColor = (0, tarjetas_utils_1.verificarColor)(req.body);
                tarjeta.color = nuevoColor;
            }
            if (PartidoID) {
                const nuevoPartidoID = (0, tarjetas_utils_1.verificarPartido)(req.body);
                const partidoRepository = db_1.dataSource.getRepository(partidos_1.Partidos);
                const partido = yield partidoRepository.findOneBy({
                    PartidoID: nuevoPartidoID
                });
                if (partido) {
                    tarjeta.Partido = partido;
                }
                else {
                    return res.json({
                        message: "No se ha encontrado el partido correspondiente"
                    });
                }
            }
            if (JugadorID) {
                const nuevoJugadorID = (0, tarjetas_utils_1.verificarJugador)(req.body);
                const jugadorRepository = db_1.dataSource.getRepository(jugadores_1.Jugadores);
                const jugador = yield jugadorRepository.findOneBy({
                    JugadorID: nuevoJugadorID
                });
                if (jugador) {
                    tarjeta.Jugador = jugador;
                }
                else {
                    return res.json({
                        message: "No se ha encontrado el jugador correspondiente"
                    });
                }
            }
            yield tarjetasRespository.save(tarjeta);
            return res.json({
                message: "Se ha modificado la tarjeta correctamente"
            });
        }
        return res.json({
            message: "No se ha encontrado la tarjeta correspondiente"
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
exports.patchTarjeta = patchTarjeta;
const deleteTarjeta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, utils_1.deleteDataRepository)(req, res, tarjetas_1.Tarjetas, "TarjetaID", "tarjeta");
});
exports.deleteTarjeta = deleteTarjeta;
