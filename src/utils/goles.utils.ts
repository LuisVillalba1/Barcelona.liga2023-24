import { dataSource } from "../db/db";
import { Goles } from "../entity/goles";
import { Gol, Minuto } from "../types";
import { isMinuto, isNumber} from "./utils";
import { Request,Response } from "express";

export const verificarJugadorID = (object : object | Gol):number=>{
    if("JugadorID" in object){
        if(isNumber(object.JugadorID)){
            return object.JugadorID
        }
        throw new Error("Formato de JugadorID no valido")
    }
    throw new Error("No se encuentra la propiedad JugadorID")
};

export const verificarPartido = (object : object | Gol):number=>{
    if("PartidoID" in object){
        if(isNumber(object.PartidoID)){
            return object.PartidoID
        }
        throw new Error("Formato de PartidoID no valido")
    }
    throw new Error("No se encuentra la PartidoID")
}

export const verificarMinuto = (object : object | Gol):Minuto=>{
    if("Minuto" in object){
        if(isMinuto(object.Minuto)){
            return object.Minuto
        }
        throw new Error("Formato de minuto no valido, los formatos validos son por ejemplo(09:10,105:00)")
    }
    throw new Error("No se encuentra la propiedad Minuto")
}


export const crearNuevoGol = (object : object | Gol):Gol=>{
    const nuevoGol : Gol = {
        JugadorID :  verificarJugadorID(object),
        PartidoID : verificarPartido(object),
        Minuto : verificarMinuto(object)
    }
    return nuevoGol
}

export const queryOrdenarGoles = async(req : Request,res : Response):Promise<Goles | Object>=>{
    try{
        const golesRepository = dataSource.getRepository(Goles);
        const goles = await golesRepository.find({
            relations :{
                Jugador : true,
                Partido : true
            }
        })
        if(req.query.ordenar == "jugadores"){
            return res.json(goles.sort((a,b)=>a.Jugador.JugadorID - b.Jugador.JugadorID))
        }
        return res.json({
            message : "Query no encontrada"
        })
    }
    catch(e){
        if(e instanceof Error){
            return res.json({
                message : e.message
            })
        }
        return res.json({
            message : "Error desconocido"
        })
    }
}