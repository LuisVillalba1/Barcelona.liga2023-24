"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tarjetas_1 = require("../connections/tarjetas");
const routerTarjetas = (0, express_1.Router)();
routerTarjetas.post("/", (req, res) => {
    (0, tarjetas_1.postTarjetas)(req, res);
});
routerTarjetas.get("/", (req, res) => {
    (0, tarjetas_1.getTarjetas)(req, res);
});
routerTarjetas.get("/:id", (req, res) => {
    (0, tarjetas_1.getTarjetaID)(req, res);
});
routerTarjetas.put("/:id", (req, res) => {
    (0, tarjetas_1.putTarjeta)(req, res);
});
routerTarjetas.patch("/:id", (req, res) => {
    (0, tarjetas_1.patchTarjeta)(req, res);
});
routerTarjetas.delete("/:id", (req, res) => {
    (0, tarjetas_1.deleteTarjeta)(req, res);
});
exports.default = routerTarjetas;
