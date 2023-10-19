"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const partidos_1 = require("../connections/partidos");
const routerPartidos = (0, express_1.Router)();
routerPartidos.post("/", (req, res) => {
    (0, partidos_1.postPartido)(req, res);
});
routerPartidos.get("/", (req, res) => {
    (0, partidos_1.getPartidos)(req, res);
});
routerPartidos.get("/:id", (req, res) => {
    (0, partidos_1.getPartidoID)(req, res);
});
routerPartidos.put("/:id", (req, res) => {
    (0, partidos_1.putPartido)(req, res);
});
routerPartidos.patch("/:id", (req, res) => {
    (0, partidos_1.patchPartido)(req, res);
});
routerPartidos.delete("/:id", (req, res) => {
    (0, partidos_1.deletePartido)(req, res);
});
exports.default = routerPartidos;
