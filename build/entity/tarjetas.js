"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarjetas = void 0;
const typeorm_1 = require("typeorm");
const enum_1 = require("../enum");
const partidos_1 = require("./partidos");
const jugadores_1 = require("./jugadores");
let Tarjetas = class Tarjetas {
};
exports.Tarjetas = Tarjetas;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Tarjetas.prototype, "TarjetaID", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: enum_1.TiposTarjeta
    }),
    __metadata("design:type", String)
], Tarjetas.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => partidos_1.Partidos, (partido) => partido.Tarjetas, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "PartidoID" }),
    __metadata("design:type", partidos_1.Partidos)
], Tarjetas.prototype, "Partido", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => jugadores_1.Jugadores, (jugador) => jugador.Tarjetas, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "JugadorID" }),
    __metadata("design:type", jugadores_1.Jugadores)
], Tarjetas.prototype, "Jugador", void 0);
exports.Tarjetas = Tarjetas = __decorate([
    (0, typeorm_1.Entity)()
], Tarjetas);
