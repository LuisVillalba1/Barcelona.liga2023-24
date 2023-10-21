import { Column, Entity,JoinColumn,ManyToOne ,PrimaryGeneratedColumn} from "typeorm";
import { Jugadores } from "./jugadores";
import { Partidos } from "./partidos";

@Entity()

//creamos la tabla goles el cual almacenara el minuto del gol, el jugador que lo anoto, y el partido en que fue realizado el gol
export class Goles{
    //creamos nuestra llave primari
    @PrimaryGeneratedColumn()
    GolID: number;

    //creamos la columna que almacenara el minuto del gol
    @Column("varchar",{
        length : 6
    })
    Minuto : string

    //hacemos una relacion de muchos a uno con los jugadores,debido a que un jugador puede anotar varios goles
    //en caso de eliminar un gol se eliminara el gol correspondientes que tiene el jugador
    @ManyToOne(()=>Jugadores,(jugador)=>jugador.Goles,{onDelete : "CASCADE",onUpdate : "CASCADE"})
    @JoinColumn({name : "JugadorID"})
    //dentro de la propiedad jugador se mostraran los datos de los jugadores correspondientes
    Jugador : Jugadores

    //creamos una relacion de muchos a uno con los partidos, ya puede haber varios goles en un partido
    @ManyToOne(()=>Partidos,(partido)=>partido.Goles,{onDelete : "CASCADE", onUpdate : "CASCADE"})
    //el cual hace referencia a la columna PartidoID de la tabla Partido
    @JoinColumn({name : "PartidoID"})
    Partido : Partidos
}