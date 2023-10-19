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
exports.Jugadores = void 0;
const typeorm_1 = require("typeorm");
const goles_1 = require("./goles");
const tarjetas_1 = require("./tarjetas");
let Jugadores = class Jugadores {
};
exports.Jugadores = Jugadores;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Jugadores.prototype, "JugadorID", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        length: 100
    }),
    __metadata("design:type", String)
], Jugadores.prototype, "Nombre_apellido", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], Jugadores.prototype, "Camiseta", void 0);
__decorate([
    (0, typeorm_1.Column)("bool"),
    __metadata("design:type", Boolean)
], Jugadores.prototype, "EnClub", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => goles_1.Goles, (goles) => goles.Jugador),
    __metadata("design:type", Array)
], Jugadores.prototype, "Goles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tarjetas_1.Tarjetas, (tarjeta) => tarjeta.Jugador),
    __metadata("design:type", tarjetas_1.Tarjetas)
], Jugadores.prototype, "Tarjetas", void 0);
exports.Jugadores = Jugadores = __decorate([
    (0, typeorm_1.Entity)()
], Jugadores);
