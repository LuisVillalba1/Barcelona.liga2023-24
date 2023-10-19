import { Entity,PrimaryGeneratedColumn,Column, OneToMany } from "typeorm";
import { Partidos } from "./partidos";


@Entity()
export class Rivales{
    @PrimaryGeneratedColumn()
    RivalID : number

    @Column("varchar",{
        length : 100
    })
    Nombre : string

    @Column("varchar",{
        length : 100
    })
    Estadio : string
    
    @OneToMany(()=>Partidos,(partido)=>partido.Rival)
    Partidos : Partidos[]
}