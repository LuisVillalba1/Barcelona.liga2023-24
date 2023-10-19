"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rivales_1 = require("../connections/rivales");
const routerRivales = (0, express_1.Router)();
routerRivales.post("/", (req, res) => {
    (0, rivales_1.postRivales)(req, res);
});
routerRivales.get("/:id", (req, res) => {
    (0, rivales_1.getRivalID)(req, res);
});
routerRivales.get("/", (_req, res) => {
    (0, rivales_1.getRivales)(res);
});
routerRivales.put("/:id", (req, res) => {
    (0, rivales_1.putRival)(req, res);
});
routerRivales.patch("/:id", (req, res) => {
    (0, rivales_1.pathRival)(req, res);
});
routerRivales.delete("/:id", (req, res) => {
    (0, rivales_1.deleteRival)(req, res);
});
exports.default = routerRivales;
