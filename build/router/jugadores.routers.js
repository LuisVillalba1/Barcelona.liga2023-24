"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jugadores_1 = require("../connections/jugadores");
const jugadores_2 = require("../connections/jugadores");
const routerJugadores = (0, express_1.Router)();
routerJugadores.post("/", (req, res) => {
    (0, jugadores_1.postJugadores)(req, res);
});
routerJugadores.get("/:id", (req, res) => {
    (0, jugadores_2.getJugadorID)(req, res);
});
routerJugadores.get("/", (_req, res) => {
    (0, jugadores_1.getJugadores)(res);
});
routerJugadores.put("/:id", (req, res) => {
    (0, jugadores_1.putJugador)(req, res);
});
routerJugadores.patch("/:id", (req, res) => {
    (0, jugadores_1.pathJugador)(req, res);
});
exports.default = routerJugadores;
