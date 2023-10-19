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
exports.Goles = void 0;
const typeorm_1 = require("typeorm");
const jugadores_1 = require("./jugadores");
const partidos_1 = require("./partidos");
let Goles = class Goles {
};
exports.Goles = Goles;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Goles.prototype, "GolID", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        length: 6
    }),
    __metadata("design:type", String)
], Goles.prototype, "Minuto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => jugadores_1.Jugadores, (jugador) => jugador.Goles, { onDelete: `CASCADE`, onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "JugadorID" }),
    __metadata("design:type", jugadores_1.Jugadores)
], Goles.prototype, "Jugador", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => partidos_1.Partidos, (partido) => partido.Goles, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "PartidoID" }),
    __metadata("design:type", partidos_1.Partidos)
], Goles.prototype, "Partido", void 0);
exports.Goles = Goles = __decorate([
    (0, typeorm_1.Entity)()
], Goles);
