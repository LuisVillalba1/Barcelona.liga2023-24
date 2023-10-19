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
exports.deleteDataRepository = exports.getDataIDRepository = exports.getDataRepository = exports.isFecha = exports.isMinuto = exports.isBoolean = exports.isNumber = exports.isString = void 0;
const db_1 = require("../db/db");
const isString = (string) => {
    return typeof string == "string";
};
exports.isString = isString;
const isNumber = (number) => {
    return typeof number == "number";
};
exports.isNumber = isNumber;
const isBoolean = (boolean) => {
    if (typeof boolean == "boolean") {
        if (boolean) {
            return true;
        }
        return false;
    }
    throw new Error("Formato de En club invalido, espera solo True o False");
};
exports.isBoolean = isBoolean;
const isMinuto = (string) => {
    if ((0, exports.isString)(string)) {
        // Nuevo formato para verificar los minutos ingresados
        const regex = /^\d{2,3}:\d{2}$/;
        return regex.test(string);
    }
    throw new Error("Formato de minuto no válido");
};
exports.isMinuto = isMinuto;
const isFecha = (string) => {
    if ((0, exports.isString)(string)) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(string);
    }
    throw new Error("Formato de fecha no valida");
};
exports.isFecha = isFecha;
const getDataRepository = (res, entityRepository, entity, relations) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = db_1.dataSource.getRepository(entityRepository);
        if (relations.length <= 0) {
            let data = yield repository.find();
            if (data.length >= 1) {
                return res.json(data);
            }
            return res.json({
                message: `Lo siento no se encuentra ningun ${entity} disponible por el momento`
            });
        }
        else {
            let dataRelations = yield repository.find({
                relations: relations
            });
            if (dataRelations.length >= 1) {
                return res.json(dataRelations);
            }
            return res.json({
                message: `Lo siento no se encuentra ningun ${entity} disponible por el momento`
            });
        }
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
exports.getDataRepository = getDataRepository;
const getDataIDRepository = (req, res, entityRepository, primaryColumn, entity, relations) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respository = db_1.dataSource.getRepository(entityRepository);
        const { id } = req.params;
        if (relations.length == 0) {
            let data = yield respository.findOneBy({
                [primaryColumn]: parseInt(id)
            });
            if (data) {
                return res.json(data);
            }
            return res.json({
                message: `no se ha encontrado ningun ${entity}`
            });
        }
        else {
            let dataRelations = yield respository.find({
                where: {
                    [primaryColumn]: parseInt(id)
                },
                relations: relations
            });
            if (dataRelations.length > 0) {
                return res.json(dataRelations);
            }
            return res.json({
                message: `No se ha encontrado ningun ${entity}`
            });
        }
    }
    catch (e) {
        if (e instanceof Error) {
            return res.json({
                message: e.message
            });
        }
        return res.json({
            messge: "Error desconocido"
        });
    }
});
exports.getDataIDRepository = getDataIDRepository;
const deleteDataRepository = (req, res, entityRepository, primaryColumn, entity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respository = db_1.dataSource.getRepository(entityRepository);
        const { id } = req.params;
        const data = yield respository.findOneBy({
            [primaryColumn]: id
        });
        if (data) {
            yield respository.remove(data);
            return res.json({
                message: `Se ha eliminado el objeto correctamente`
            });
        }
        return res.json({
            message: `No se ha encontrado ningun ${entity} correspondiente`
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
exports.deleteDataRepository = deleteDataRepository;
