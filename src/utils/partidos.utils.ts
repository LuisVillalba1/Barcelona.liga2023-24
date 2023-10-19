
import { dataSource } from "../db/db";
import { Partidos } from "../entity/partidos";
import { Fecha, Partido } from "../types";
import { isFecha, isNumber, isString } from "./utils";
import { Request, Response } from "express";

export const verificarRivalID = (object : object | Partido):number=>{
    if("RivalID" in object){
        if(isNumber(object.RivalID)){
            return object.RivalID
        }
        throw new Error("Formato de RivalID no valido")
    }
    throw new Error("No se ha encontrado la propiedad RivalID")
}

export const verificarGolesRival = (object : object | Partido):number=>{
    if("GolesRival" in object){
        if(isNumber(object.GolesRival)){
            return object.GolesRival
        }
        throw new Error("Formato de GolesRival no valido")
    }
    throw new Error("No se ha encontrado la propiedad GolesRival")
}

export const verificarFecha = (object : object | Partido):Fecha=>{
    if("Fecha" in object){
        if(isFecha(object.Fecha)){
            return object.Fecha
        }
        else{
            throw new Error("Formato de fecha no valida, se aceptan formatos de tipo date, por ejemplo: 2023-08-24")
        }
    }
    throw new Error("No se encuentra la propiedad Fecha")
}

export const verificarEstadioJugado = (object : object | Partido):string=>{
    if("EstadioJugado" in object){
        if(isString(object.EstadioJugado)){
            return object.EstadioJugado
        }
        throw new Error("Formato de EstadioJugado no valido")
    }
    throw new Error("No se encuentra la propiedad EstadioJugado")
}

export const crearNuevoPartido = (object : object | Partido):Partido=>{
    const nuevoPartido : Partido = {
        RivalID : verificarRivalID(object),
        GolesRival : verificarGolesRival(object),
        Fecha : verificarFecha(object),
        EstadioJugado : verificarEstadioJugado(object)
    } 
    return nuevoPartido
}

export const queryOrdenarPartidos = async(req : Request,res : Response):Promise<Partidos | object>=>{
    try{
        const partidoRepository = dataSource.getRepository(Partidos);
        const partidos = await partidoRepository.find({
            relations : {
                Goles : true,
                Rival : true
            }
        })
        if(partidos.length > 0){
            if(req.query.mostrar == "ganados"){
                const ganados = partidos.filter((a)=>a.Goles.length > a.GolesRival);
                if(ganados.length > 0){
                    return res.json(ganados)
                }
                return res.json({
                    message : "No se ha encontrado ningun partido ganado por el momento"
                })
            }
            if(req.query.mostrar == "perdidos"){
                const perdidos = partidos.filter((a)=>a.Goles.length < a.GolesRival);
                if(perdidos.length > 0){
                    return res.json(perdidos)
                }
                return res.json({
                    message : "No se ha encontrado ningun partido perdido por el momento"
                })
            }
            if(req.query.mostrar == "empatados"){
                const empatados = partidos.filter((a)=>a.Goles.length == a.GolesRival);
                if(empatados.length > 0){
                    return res.json(empatados)
                }
                return res.json({
                    message : "No se ha encontrado ningun partido empatado por el momento"
                })
            }
            return res.json({
                message : "Query no encontrada"
            })
        }
        return res.json({
            message : "No hay ningun partido por el momento"
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