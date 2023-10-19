import { Entity,Column, OneToMany,PrimaryGeneratedColumn } from "typeorm";
import { Goles } from "./goles";
import { Tarjetas } from "./tarjetas";

@Entity()
export class Jugadores {
    @PrimaryGeneratedColumn()
    JugadorID: number

    @Column("varchar",{
        length : 100
    })
    Nombre_apellido : string

    @Column("int")
    Camiseta : number

    @Column("bool")
    EnClub : boolean

    @OneToMany(()=>Goles,(goles)=>goles.Jugador)
    Goles : Goles[]

    @OneToMany(()=>Tarjetas,(tarjeta)=>tarjeta.Jugador)
    Tarjetas : Tarjetas
}