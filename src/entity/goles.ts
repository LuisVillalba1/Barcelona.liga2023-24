import { Column, Entity,JoinColumn,ManyToOne ,PrimaryGeneratedColumn} from "typeorm";
import { Jugadores } from "./jugadores";
import { Partidos } from "./partidos";

@Entity()
export class Goles{
    @PrimaryGeneratedColumn()
    GolID: number; // Esta será tu columna primaria

    @Column("varchar",{
        length : 6
    })
    Minuto : string

    @ManyToOne(()=>Jugadores,(jugador)=>jugador.Goles,{onDelete : `CASCADE`,onUpdate : "CASCADE"})
    @JoinColumn({name : "JugadorID"})
    Jugador : Jugadores

    @ManyToOne(()=>Partidos,(partido)=>partido.Goles,{onDelete : "CASCADE",onUpdate : "CASCADE"})
    @JoinColumn({name : "PartidoID"})
    Partido : Partidos
}