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
exports.Partidos = void 0;
const typeorm_1 = require("typeorm");
const rivales_1 = require("./rivales");
const goles_1 = require("./goles");
const tarjetas_1 = require("./tarjetas");
let Partidos = class Partidos {
};
exports.Partidos = Partidos;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Partidos.prototype, "PartidoID", void 0);
__decorate([
    (0, typeorm_1.Column)("smallint"),
    __metadata("design:type", Number)
], Partidos.prototype, "GolesRival", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    __metadata("design:type", String)
], Partidos.prototype, "Fecha", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        length: 100
    }),
    __metadata("design:type", String)
], Partidos.prototype, "EstadioJugado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rivales_1.Rivales, (rival) => rival.Partidos, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "RivalID" }),
    __metadata("design:type", rivales_1.Rivales)
], Partidos.prototype, "Rival", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => goles_1.Goles, (gol) => gol.Partido),
    __metadata("design:type", Array)
], Partidos.prototype, "Goles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tarjetas_1.Tarjetas, (tarjeta) => tarjeta.Partido),
    __metadata("design:type", Array)
], Partidos.prototype, "Tarjetas", void 0);
exports.Partidos = Partidos = __decorate([
    (0, typeorm_1.Entity)()
], Partidos);
