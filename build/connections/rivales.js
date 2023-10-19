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
exports.deleteRival = exports.pathRival = exports.putRival = exports.getRivales = exports.getRivalID = exports.postRivales = void 0;
const rivales_1 = require("../entity/rivales");
const db_1 = require("../db/db");
const rivales_utils_1 = require("../utils/rivales.utils");
const utils_1 = require("../utils/utils");
const postRivales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rival = (0, rivales_utils_1.crearNuevoRival)(req.body);
        const nuevoRival = new rivales_1.Rivales();
        nuevoRival.Nombre = rival.Nombre;
        nuevoRival.Estadio = rival.Estadio;
        yield db_1.dataSource.manager.save(nuevoRival);
        return res.json(nuevoRival);
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
exports.postRivales = postRivales;
const getRivalID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, utils_1.getDataIDRepository)(req, res, rivales_1.Rivales, "RivalID", "rival", []);
});
exports.getRivalID = getRivalID;
const getRivales = (res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, utils_1.getDataRepository)(res, rivales_1.Rivales, "rival", []);
});
exports.getRivales = getRivales;
const putRival = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rivalRepository = db_1.dataSource.getRepository(rivales_1.Rivales);
        const { id } = req.params;
        const rival = yield rivalRepository.findOneBy({
            RivalID: parseInt(id)
        });
        if (rival) {
            const nuevoRivalData = (0, rivales_utils_1.crearNuevoRival)(req.body);
            rival.Nombre = nuevoRivalData.Nombre;
            rival.Estadio = nuevoRivalData.Estadio;
            yield rivalRepository.save(rival);
            return res.json({
                message: "Se ha actualizado el rival correctamente"
            });
        }
        return res.json({
            message: "No se ha encontrado ningun rival"
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
exports.putRival = putRival;
const pathRival = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rivalRepository = db_1.dataSource.getRepository(rivales_1.Rivales);
        const { id } = req.params;
        const rival = yield rivalRepository.findOneBy({
            RivalID: parseInt(id)
        });
        if (rival) {
            const { Nombre, Estadio } = req.body;
            if (Nombre != undefined) {
                if (typeof Nombre == "string") {
                    rival.Nombre = Nombre;
                }
                else {
                    throw new Error("Formato de rival no valido");
                }
            }
            if (Estadio != undefined) {
                if (typeof Estadio == "string") {
                    rival.Estadio = Estadio;
                }
                else {
                    throw new Error("Formato de estadio no valido");
                }
            }
            yield rivalRepository.save(rival);
            return res.json(rival);
        }
        return res.json({
            message: "No se ha encontrado ningun rival"
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
exports.pathRival = pathRival;
const deleteRival = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, utils_1.deleteDataRepository)(req, res, rivales_1.Rivales, "RivalID", "rival");
});
exports.deleteRival = deleteRival;
