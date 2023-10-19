"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearNuevoJugador = void 0;
const utils_1 = require("./utils");
const verficarNombres = (objet) => {
    if ("Nombre_apellido" in objet) {
        if ((0, utils_1.isString)(objet.Nombre_apellido)) {
            return objet.Nombre_apellido;
        }
        throw new Error("El formato del nombre y apellido no es correcto");
    }
    throw new Error("Formato de objeto no valido, falta la propiedad Nombre_apellido");
};
const verificarCamiseta = (object) => {
    if ("Camiseta" in object) {
        if ((0, utils_1.isNumber)(object.Camiseta)) {
            return object.Camiseta;
        }
        throw new Error("Camiseta invalida");
    }
    throw new Error("Formato de objeto no valido, falta la propiedad Camiseta");
};
const verificarEstadoClub = (object) => {
    if ("Enclub" in object) {
        const enClubData = (0, utils_1.isBoolean)(object.Enclub);
        return enClubData;
    }
    throw new Error("Formato de objeto no valido, falta la propiedad Enclub");
};
const crearNuevoJugador = (object) => {
    const nuevoJugador = {
        Nombre_apellido: verficarNombres(object),
        Camiseta: verificarCamiseta(object),
        Enclub: verificarEstadoClub(object)
    };
    return nuevoJugador;
};
exports.crearNuevoJugador = crearNuevoJugador;
