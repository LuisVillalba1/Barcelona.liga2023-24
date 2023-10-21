import { Entity,PrimaryGeneratedColumn,Column, OneToMany } from "typeorm";
import { Partidos } from "./partidos";


@Entity()
//creamos la tabla rivales, el cual almacenara el nombre del equipo rival, y su estadio
export class Rivales{
    //creamos la llave primaria
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
    
    //establecemos una relacion de uno a muchos ya que un rival puede tener varios partidos
    //en caso de eliminar un rival se eliminara el partido correspondiente, y en caso de actualizarse se modificara el ultimo mencionado
    @OneToMany(()=>Partidos,(partido)=>partido.Rival,{onDelete : "CASCADE", onUpdate : "CASCADE"})
    Partidos : Partidos[]
}