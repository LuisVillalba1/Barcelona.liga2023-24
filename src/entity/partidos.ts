import { Entity,PrimaryGeneratedColumn,Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Rivales } from "./rivales";
import { Goles } from "./goles";
import { Tarjetas } from "./tarjetas";

@Entity()
//creamos la tabla partidos el cual almacenara los goles convertidos por el rival,fecha del partido disputado, estadio jugado,
//rival enfrentado, goles convertidos por parte de nuestro club
export class Partidos{
    //creamo la llave primaria
    @PrimaryGeneratedColumn()
    PartidoID : number

    //creamos la columna que almacenara la cantidad de goles anotados por el rival
    @Column("smallint")
    GolesRival : number

    //fecha disputada del partido
    @Column("date")
    Fecha : string

    //estadio en el que se disputo el partido
    @Column("varchar",{
        length : 100
    })
    EstadioJugado : string

    //creamos una relacion de muchos a uno con los rivales el cual nos permitira conocer los datos del rival con el que se disputo el partido
    //la relacion es de muchos a uno ya que se puede jugar varias veces contra el mismo rival
    @ManyToOne(()=>Rivales,(rival)=>rival.Partidos,{onDelete : "CASCADE",onUpdate : "CASCADE"})
    @JoinColumn({name : "RivalID"})
    Rival : Rivales

    //relacion de uno a muchos con los goles, debido a que un partido puede recibir varios goles
    //en caso de eliminar el partido se eliminara el gol que le correspondia
    @OneToMany(()=>Goles,(gol)=>gol.Partido,{onDelete : "CASCADE", onUpdate : "CASCADE"})
    Goles : Goles[]

    //relacion de uno a muchos, ya que en un partido puede haber muchas tarjetas recibidas
    //en caso de eliminar un partido se eliminara la tarjeta con la cual se encontraba vinculada
    @OneToMany(()=>Tarjetas,(tarjeta)=>tarjeta.Partido,{onDelete : "CASCADE", onUpdate : "CASCADE"})
    Tarjetas : Tarjetas[]
}