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
exports.deleteGol = exports.pathGol = exports.putGol = exports.getGolID = exports.GetGoles = exports.postGoles = void 0;
const db_1 = require("../db/db");
const goles_utils_1 = require("../utils/goles.utils");
const goles_1 = require("../entity/goles");
const jugadores_1 = require("../entity/jugadores");
const partidos_1 = require("../entity/partidos");
const utils_1 = require("../utils/utils");
const postGoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gol = (0, goles_utils_1.crearNuevoGol)(req.body);
        const jugadorRepository = db_1.dataSource.getRepository(jugadores_1.Jugadores);
        const jugador = yield jugadorRepository.findOneBy({
            JugadorID: gol.JugadorID
        });
        const partidoRepository = db_1.dataSource.getRepository(partidos_1.Partidos);
        const partido = yield partidoRepository.findOneBy({
            PartidoID: gol.PartidoID
        });
        if (jugador) {
            if (partido) {
                const nuevoGol = new goles_1.Goles();
                nuevoGol.Minuto = gol.Minuto;
                nuevoGol.Jugador = jugador;
                nuevoGol.Partido = partido;
                yield db_1.dataSource.manager.save(nuevoGol);
                return res.json(nuevoGol);
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
exports.postGoles = postGoles;
const GetGoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.query).length > 0) {
        yield (0, goles_utils_1.queryOrdenarGoles)(req, res);
    }
    else {
        yield (0, utils_1.getDataRepository)(res, goles_1.Goles, "gol", ["Jugador", "Partido"]);
    }
});
exports.GetGoles = GetGoles;
const getGolID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, utils_1.getDataIDRepository)(req, res, goles_1.Goles, "GolID", "gol", ["Jugador", "Partido"]);
});
exports.getGolID = getGolID;
const putGol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const nuevoGol = (0, goles_utils_1.crearNuevoGol)(req.body);
        const golesRepository = db_1.dataSource.getRepository(goles_1.Goles);
        const gol = yield golesRepository.findOneBy({
            GolID: parseInt(id)
        });
        const partidoRepository = db_1.dataSource.getRepository(partidos_1.Partidos);
        const partido = yield partidoRepository.findOneBy({
            PartidoID: nuevoGol.PartidoID
        });
        const jugadorRepository = db_1.dataSource.getRepository(jugadores_1.Jugadores);
        const jugador = yield jugadorRepository.findOneBy({
            JugadorID: nuevoGol.JugadorID
        });
        if (gol) {
            if (partido) {
                if (jugador) {
                    gol.Minuto = nuevoGol.Minuto;
                    gol.Jugador = jugador;
                    gol.Partido = partido;
                    yield golesRepository.save(gol);
                    return res.json({
                        message: "Se ha modificado el gol correctamente"
                    });
                }
                return res.json({
                    message: "No se ha encontrado el jugador correspondiente"
                });
            }
            return res.json({
                message: "No se ha encontrado el partido correspondiente"
            });
        }
        return res.json({
            message: "No se ha encontrado el gol correspondiente"
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
exports.putGol = putGol;
const pathGol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const golesRepository = db_1.dataSource.getRepository(goles_1.Goles);
        const gol = yield golesRepository.findOneBy({
            GolID: parseInt(id)
        });
        if (gol) {
            const { JugadorID, PartidoID, Minuto } = req.body;
            if (JugadorID) {
                const nuevoJugadorID = (0, goles_utils_1.verificarJugadorID)(req.body);
                const jugadorRepository = db_1.dataSource.getRepository(jugadores_1.Jugadores);
                const jugador = yield jugadorRepository.findOneBy({
                    JugadorID: nuevoJugadorID
                });
                if (jugador) {
                    gol.Jugador = jugador;
                }
                else {
                    return res.json({
                        message: "No se ha encontrado el jugador correspondiente"
                    });
                }
            }
            if (PartidoID) {
                const nuevoPartidoID = (0, goles_utils_1.verificarPartido)(req.body);
                const partidoRepository = db_1.dataSource.getRepository(partidos_1.Partidos);
                const partido = yield partidoRepository.findOneBy({
                    PartidoID: nuevoPartidoID
                });
                if (partido) {
                    gol.Partido = partido;
                }
                else {
                    return res.json({
                        message: "No se ha encontrado el partido correspondiente"
                    });
                }
            }
            if (Minuto) {
                const nuevoMinuto = (0, goles_utils_1.verificarMinuto)(req.body);
                gol.Minuto = nuevoMinuto;
            }
            yield golesRepository.save(gol);
            return res.json({
                message: "Se ha modificado el gol correctamente"
            });
        }
        return res.json({
            message: "No se ha encontrado el gol correspondiente"
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
exports.pathGol = pathGol;
const deleteGol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, utils_1.deleteDataRepository)(req, res, goles_1.Goles, "GolID", "gol");
});
exports.deleteGol = deleteGol;
