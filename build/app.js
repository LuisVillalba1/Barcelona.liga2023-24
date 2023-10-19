"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const jugadores_routers_1 = __importDefault(require("./router/jugadores.routers"));
const rivales_routers_1 = __importDefault(require("./router/rivales.routers"));
const partidos_router_1 = __importDefault(require("./router/partidos.router"));
const goles_router_1 = __importDefault(require("./router/goles.router"));
const tarjetas_router_1 = __importDefault(require("./router/tarjetas.router"));
const app = (0, express_1.default)();
//nos brinda detalles sobre las solicitudes recibidas
app.use((0, morgan_1.default)("dev"));
//permite realizar solicitudes desde orgines diferentes
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/jugadores/", jugadores_routers_1.default);
app.use("/api/rivales/", rivales_routers_1.default);
app.use("/api/goles/", goles_router_1.default);
app.use("/api/partidos/", partidos_router_1.default);
app.use("/api/tarjetas/", tarjetas_router_1.default);
app.use("/api/", (_req, res) => {
    res.send("Bienvenidos a mi api sobre el futbol club barcelona en la liga local 2023-2024");
});
app.use("*", (_req, res) => {
    res.send({
        message: "Ruta no encontrada"
    });
});
exports.default = app;
