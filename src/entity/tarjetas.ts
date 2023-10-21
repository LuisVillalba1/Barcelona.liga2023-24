import { Entity,PrimaryGeneratedColumn,Column, ManyToOne, JoinColumn } from "typeorm";
import { TiposTarjeta } from "../enum";
import { Partidos } from "./partidos";
import { Jugadores } from "./jugadores";

@Entity()
//creamos la tabla tarjetas el cual almacenara el jugador que recibio la tarjeta, el color y el partido en que se realizo la tarjeta
export class Tarjetas{
    //creamos nuestra llave primaria
    @PrimaryGeneratedColumn()
    TarjetaID : number

    //creamos la columna color el cual solo puede recibir como valores Amarrila y Roja
    @Column({
        type : "enum",
        enum : TiposTarjeta
    })
    color : TiposTarjeta

    //creamos una relacion de muchos a uno debido a que en un partido puede haber varias tarjetas
    //en caso de eliminar una tarjeta se eliminara el partido correspondiente
    @ManyToOne(()=>Partidos,(partido)=>partido.Tarjetas,{onDelete : "CASCADE",onUpdate : "CASCADE"})
    @JoinColumn({name : "PartidoID"})
    Partido : Partidos

    //establecemoa una relacion de muchos a uno con la tabla tarjetas
    //en caso de eliminar una tarjeta se elimara la tarjeta relacionda con el jugador
    @ManyToOne(()=>Jugadores,(jugador)=>jugador.Tarjetas,{onDelete : "CASCADE",onUpdate : "CASCADE"})
    @JoinColumn({name : "JugadorID"})
    Jugador : Jugadores
}