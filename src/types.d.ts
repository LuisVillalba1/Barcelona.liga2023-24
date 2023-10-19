import { Entity } from "typeorm"
import { TiposTarjeta } from "./enum"
import { Jugadores } from "./entity/jugadores"
import { Tarjetas } from "./entity/tarjetas"
import { Rivales } from "./entity/rivales"
import { Partidos } from "./entity/partidos"
import { Goles } from "./entity/goles"

export type Minuto = `${number}:${number}`;
export type Fecha = `${string}-${string}-${string}`;
export type Entity = typeof Jugadores | typeof Tarjetas | typeof Partidos | typeof Rivales | typeof Goles;

export interface Jugador{
    Nombre_apellido : string,
    Camiseta : number,
    Enclub : boolean
}

export interface Rival{
    Nombre : string,
    Estadio : string
}

export interface Gol{
    JugadorID : number,
    PartidoID : number,
    Minuto : Minuto
}

export interface Partido {
    RivalID : number,
    GolesRival : number,
    Fecha : Fecha,
    EstadioJugado : string
}

export interface Tarjeta{
    Color : TiposTarjeta,
    PartidoID : number,
    JugadorID : number
}
