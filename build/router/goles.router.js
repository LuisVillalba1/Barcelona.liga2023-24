"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const goles_1 = require("../connections/goles");
const routerGoles = (0, express_1.Router)();
routerGoles.post("/", (req, res) => {
    (0, goles_1.postGoles)(req, res);
});
routerGoles.get("/", (req, res) => {
    (0, goles_1.GetGoles)(req, res);
});
routerGoles.get("/:id", (req, res) => {
    (0, goles_1.getGolID)(req, res);
});
routerGoles.put("/:id", (req, res) => {
    (0, goles_1.putGol)(req, res);
});
routerGoles.patch("/:id", (req, res) => {
    (0, goles_1.pathGol)(req, res);
});
routerGoles.delete("/:id", (req, res) => {
    (0, goles_1.deleteGol)(req, res);
});
exports.default = routerGoles;
