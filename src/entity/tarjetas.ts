import { Entity,PrimaryGeneratedColumn,Column, ManyToOne, JoinColumn } from "typeorm";
import { TiposTarjeta } from "../enum";
import { Partidos } from "./partidos";
import { Jugadores } from "./jugadores";

@Entity()
export class Tarjetas{
    @PrimaryGeneratedColumn()
    TarjetaID : number

    @Column({
        type : "enum",
        enum : TiposTarjeta
    })
    color : TiposTarjeta

    @ManyToOne(()=>Partidos,(partido)=>partido.Tarjetas,{onDelete : "CASCADE",onUpdate : "CASCADE"})
    @JoinColumn({name : "PartidoID"})
    Partido : Partidos

    @ManyToOne(()=>Jugadores,(jugador)=>jugador.Tarjetas,{onDelete : "CASCADE",onUpdate : "CASCADE"})
    @JoinColumn({name : "JugadorID"})
    Jugador : Jugadores
}