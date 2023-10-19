import { dataSource } from "../db/db";
import { Tarjetas } from "../entity/tarjetas";
import { TiposTarjeta } from "../enum";
import { Tarjeta } from "../types";
import { isNumber, isString } from "./utils";
import { Request ,Response } from "express";


export const verificarColor = (object : object | Tarjeta):TiposTarjeta | never=>{
    if("Color" in object){
        if(isString(object.Color)){
            if(Object.values(TiposTarjeta).includes(object.Color)){
                return object.Color
            }
            throw new Error("Lo siento no se encuentra el tipo de tarjeta pasada, solo se aceptan Amarilla o Roja")
        }
        throw new Error("Formato de tarjeta no valido")
    }
    throw new Error("No se encuentra la propiedad Color")
}

export const verificarPartido = (object : object | Tarjeta):number | never =>{
    if("PartidoID" in object){
        if(isNumber(object.PartidoID)){
            return object.PartidoID
        }
        throw new Error("Formato de PartidoID no valido")
    }
    throw new Error("No se encuentra la propiedad PartidoID")
}

export const verificarJugador = (object : object | Tarjeta):number | never=>{
    if("JugadorID" in object){
        if(isNumber(object.JugadorID)){
            return object.JugadorID
        }
        throw new Error("Formato de JugadorID no valido")
    }
    throw new Error("No se encuentra la propiedad JugadorID")
}

export const crearNuevaTarjeta = (object : object | Tarjeta):Tarjeta=>{
    const nuevaTarjeta : Tarjeta = {
        Color : verificarColor(object),
        PartidoID : verificarPartido(object),
        JugadorID : verificarJugador(object)
    }
    return nuevaTarjeta
}

export const queryOrdenarTarjetas = async(req : Request,res : Response)=>{
    try{
        const tarjetasRepository = dataSource.getRepository(Tarjetas);
        const tarjetas = await tarjetasRepository.find({
            relations : {
                Jugador : true,
                Partido : true
            }
        })
        if(tarjetas.length > 0){
            if(req.query.ordenar == "jugadores"){
                return res.json(tarjetas.sort((a,b)=>a.Jugador.JugadorID - b.Jugador.JugadorID))
            }
            if(req.query.ordenar == "tarjetas"){
                return res.json(tarjetas.sort((a,b)=>{
                    const colorOrden = {Amarilla : 1,Roja : 2};
                    return colorOrden[a.color] - colorOrden[b.color];
                }))
            }
            return res.json({
                message : "Query no encontrada"
            })
        }
        return res.json({
            message : "No se ha encontrado ninguna tarjeta por el momento"
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