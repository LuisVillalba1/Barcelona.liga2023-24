import { Entity,Column, OneToMany,PrimaryGeneratedColumn } from "typeorm";
import { Goles } from "./goles";
import { Tarjetas } from "./tarjetas";

@Entity()
//creamos la tabla jugadores el cual almacenara su nombre y apellido,numero de camiseta, goles convertidos y tarjetas recibidas
export class Jugadores {
    //generamos la llave primaria
    @PrimaryGeneratedColumn()
    JugadorID: number

    //creamos una columna que almacenara los nombres y apellidos
    @Column("varchar",{
        length : 100
    })
    Nombre_apellido : string

    //creamos la columna que almacenara la camiseta del jugador
    @Column("int")
    Camiseta : number

    //creamos la columna EnClub el cual recibira solo boolenas, hace referencia a que si el jugador se encuentra
    //actualmente en el club o no, true si lo esta, false en caso contrario
    @Column("bool")
    EnClub : boolean

    //creamos una relacion de uno a muchos con la tabla Goles, el cual nos mostrara todos los goles convertidos por los jugadores
    //en caso de actualizar un jugador, se actualiza los datos de la tabla en la columna Jugadores
    @OneToMany(()=>Goles,(goles)=>goles.Jugador)
    Goles : Goles[]

    //creamos una realacion de uno a mucho con la tabla Tarjetas,el cual nos mostrara todos las tarjetas que recibio el jugador
    //en caso de actualizar un jugador, se actualiza los datos de la tabla en la columna Jugador
    @OneToMany(()=>Tarjetas,(tarjeta)=>tarjeta.Jugador)
    Tarjetas : Tarjetas[]
}