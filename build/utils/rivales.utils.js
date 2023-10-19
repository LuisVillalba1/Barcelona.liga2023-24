"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearNuevoRival = void 0;
const utils_1 = require("./utils");
const verificarNombre = (object) => {
    if ("Nombre" in object) {
        if ((0, utils_1.isString)(object.Nombre)) {
            return object.Nombre;
        }
        throw new Error("Formato de equipo no valido");
    }
    throw new Error("Falta la propiedad Nombre");
};
const verificarEstadio = (object) => {
    if ("Estadio" in object) {
        if ((0, utils_1.isString)(object.Estadio)) {
            return object.Estadio;
        }
        throw new Error("Formato de estadio no valido");
    }
    throw new Error("Falta la propiedad Estadio");
};
const crearNuevoRival = (object) => {
    const nuevoRival = {
        Nombre: verificarNombre(object),
        Estadio: verificarEstadio(object)
    };
    return nuevoRival;
};
exports.crearNuevoRival = crearNuevoRival;
