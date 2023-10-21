import { DataSource,DataSourceOptions } from "typeorm";
import { Jugadores } from "../entity/jugadores";
import { Goles } from "../entity/goles";
import { Partidos } from "../entity/partidos";
import { Tarjetas } from "../entity/tarjetas";
import { Rivales } from "../entity/rivales";
import {dbHost,dbName,dbPassword,dbPort,dbUser} from "./config"

//configuramos las opciones para conectarnos a nuestra base de datos
const dataSourceOptions : DataSourceOptions ={
    type : "mysql",
    host : dbHost,
    port : dbPort,
    username : dbUser,
    password : dbPassword,
    database : dbName,
    entities : [Jugadores,Goles,Partidos,Tarjetas,Rivales],
    synchronize: true,
    logging: false
}

//creamos la base de datos
export const dataSource = new DataSource(dataSourceOptions)
