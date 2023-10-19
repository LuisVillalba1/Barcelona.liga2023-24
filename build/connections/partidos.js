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
exports.deletePartido = exports.patchPartido = exports.putPartido = exports.getPartidoID = exports.getPartidos = exports.postPartido = void 0;
const partidos_utils_1 = require("../utils/partidos.utils");
const partidos_1 = require("../entity/partidos");
const db_1 = require("../db/db");
const rivales_1 = require("../entity/rivales");
const utils_1 = require("../utils/utils");
const postPartido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partido = (0, partidos_utils_1.crearNuevoPartido)(req.body);
        const rivalRepository = db_1.dataSource.getRepository(rivales_1.Rivales);
        const rival = yield rivalRepository.findOneBy({
            RivalID: partido.RivalID
        });
        if (rival) {
            const nuevoPartido = new partidos_1.Partidos();
            nuevoPartido.GolesRival = partido.GolesRival;
            nuevoPartido.Fecha = partido.Fecha;
            nuevoPartido.EstadioJugado = partido.EstadioJugado;
            nuevoPartido.Rival = rival;
            yield db_1.dataSource.manager.save(nuevoPartido);
            return res.json(nuevoPartido);
        }
        return res.json({
            message: "No se ha encontrado el rival correspondiente"
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
exports.postPartido = postPartido;
const getPartidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.query).length > 0) {
        (0, partidos_utils_1.queryOrdenarPartidos)(req, res);
    }
    else {
        yield (0, utils_1.getDataRepository)(res, partidos_1.Partidos, "partido", ["Goles", "Rival"]);
    }
});
exports.getPartidos = getPartidos;
const getPartidoID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const partidoRepository = db_1.dataSource.getRepository(partidos_1.Partidos);
        const partido = yield partidoRepository.find({
            where: {
                PartidoID: parseInt(id)
            },
            relations: ["Goles", "Rival"]
        });
        if (partido.length >= 1) {
            return res.json(partido);
        }
        return res.json({
            message: "No se ha encontrado el partido correspondiente"
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
exports.getPartidoID = getPartidoID;
const putPartido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const partidoRepository = db_1.dataSource.getRepository(partidos_1.Partidos);
        const partido = yield partidoRepository.findOneBy({
            PartidoID: parseInt(id)
        });
        const nuevoPartido = (0, partidos_utils_1.crearNuevoPartido)(req.body);
        const rivalRepository = db_1.dataSource.getRepository(rivales_1.Rivales);
        const rival = yield rivalRepository.findOneBy({
            RivalID: nuevoPartido.RivalID
        });
        if (partido) {
            if (rival) {
                partido.GolesRival = nuevoPartido.GolesRival;
                partido.Fecha = nuevoPartido.Fecha;
                partido.EstadioJugado = nuevoPartido.EstadioJugado;
                partido.Rival = rival;
                yield partidoRepository.save(partido);
                return res.json({
                    message: "Se ha modificado el partido correctamente"
                });
            }
            return res.json({
                message: "No se ha encontrado el rival correspondiente"
            });
        }
        return res.json({
            message: "No se ha encontrado el partido con el correspondiente id"
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
exports.putPartido = putPartido;
const patchPartido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const partidoRepository = db_1.dataSource.getRepository(partidos_1.Partidos);
        const partido = yield partidoRepository.findOneBy({
            PartidoID: parseInt(id)
        });
        if (partido) {
            const { RivalID, GolesRival, Fecha, EstadioJugado } = req.body;
            if (typeof GolesRival != "undefined") {
                partido.GolesRival = (0, partidos_utils_1.verificarGolesRival)(req.body);
            }
            if (Fecha) {
                partido.Fecha = (0, partidos_utils_1.verificarFecha)(req.body);
            }
            if (EstadioJugado) {
                partido.EstadioJugado = (0, partidos_utils_1.verificarEstadioJugado)(req.body);
            }
            if (RivalID) {
                const rivalID = (0, partidos_utils_1.verificarRivalID)(req.body);
                const rivalRepository = db_1.dataSource.getRepository(rivales_1.Rivales);
                const rival = yield rivalRepository.findOneBy({
                    RivalID: rivalID
                });
                if (rival) {
                    partido.Rival = rival;
                }
                else {
                    return res.json({
                        message: "No se ha encontrado el rival correspondiete"
                    });
                }
            }
            partidoRepository.save(partido);
            return res.json({
                message: "Se han actualizado los datos correctamente"
            });
        }
        return res.json({
            message: "No se ha encontrado el partido correspondiente"
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
exports.patchPartido = patchPartido;
const deletePartido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, utils_1.deleteDataRepository)(req, res, partidos_1.Partidos, "PartidoID", "partido");
});
exports.deletePartido = deletePartido;
