import { Entity,PrimaryGeneratedColumn,Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Rivales } from "./rivales";
import { Goles } from "./goles";
import { Tarjetas } from "./tarjetas";

@Entity()
export class Partidos{
    @PrimaryGeneratedColumn()
    PartidoID : number

    @Column("smallint")
    GolesRival : number

    @Column("date")
    Fecha : string

    @Column("varchar",{
        length : 100
    })
    EstadioJugado : string

    @ManyToOne(()=>Rivales,(rival)=>rival.Partidos,{onDelete : "CASCADE", onUpdate : "CASCADE"})
    @JoinColumn({name : "RivalID"})
    Rival : Rivales

    @OneToMany(()=>Goles,(gol)=>gol.Partido)
    Goles : Goles[]

    @OneToMany(()=>Tarjetas,(tarjeta)=>tarjeta.Partido)
    Tarjetas : Tarjetas[]
}