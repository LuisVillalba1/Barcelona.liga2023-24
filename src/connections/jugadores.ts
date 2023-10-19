import { Request,Response } from "express";
import { crearNuevoJugador } from "../utils/jugadores.utils";
import { Jugadores } from "../entity/jugadores";
import { dataSource } from "../db/db";
import { getDataIDRepository, getDataRepository, isBoolean } from "../utils/utils";

export const postJugadores = async(req : Request, res : Response):Promise<Jugadores | object>=>{
    try{
        const jugador = crearNuevoJugador(req.body);
        const nuevoJugador = new Jugadores();
        nuevoJugador.Nombre_apellido = jugador.Nombre_apellido;
        nuevoJugador.Camiseta = jugador.Camiseta;
        nuevoJugador.EnClub = jugador.Enclub

        await dataSource.manager.save(nuevoJugador);
        return res.json(nuevoJugador)
    }
    catch(e){
        if(e instanceof Error){
            return res.status(404).json({
                message : e.message
            })
        }
        else{
            return res.json({
                message : "Error desconocido"
            })
        }
    }
}

export const getJugadorID = async(req : Request , res : Response)=>{
    await getDataIDRepository(req,res,Jugadores,"JugadorID","jugador",[]);
}

export const getJugadores = async(res : Response)=>{
    await getDataRepository(res,Jugadores,"jugador",[]);
}

export const putJugador = async(req : Request, res : Response):Promise<object>=>{
    try{
        const playerRespository = dataSource.getRepository(Jugadores);
        const {id} = req.params;
        const jugador = await playerRespository.findOneBy({
            JugadorID : parseInt(id)
        })
        if(jugador){
            const nuevoJugador = crearNuevoJugador(req.body);
            jugador.Nombre_apellido = nuevoJugador.Nombre_apellido;
            jugador.Camiseta = nuevoJugador.Camiseta;
            jugador.EnClub = nuevoJugador.Enclub;
            await playerRespository.save(jugador);
            return res.json({
                message : "Jugador actualizado con exito"
            })
        }
        return res.json({
            message : "No se ha encontrado ningun jugador"
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

export const pathJugador = async(req : Request, res : Response):Promise<object>=>{
    try{
        const playerRespository = dataSource.getRepository(Jugadores);
        const {id} = req.params;
        const jugador = await playerRespository.findOneBy({
            JugadorID : parseInt(id)
        })
        if(jugador){
            const {Nombre_apellido,Camiseta,Enclub} = req.body;
            if (Nombre_apellido !== undefined) {
                if(typeof Nombre_apellido == "string"){
                    jugador.Nombre_apellido = Nombre_apellido;
                }
                else{throw new Error("El formato del nombre y apellido no es correcto")}
            }
            if (Camiseta !== undefined) {
                if(typeof Camiseta == "number"){
                    jugador.Camiseta = Camiseta;
                }
                else{throw new Error("Camiseta invalida")}
            }
            if (Enclub !== undefined) {
                jugador.EnClub = isBoolean(Enclub);
            }
            await playerRespository.save(jugador)
            return res.json({
                message : "Jugador actualizado con exito"
            })
        }
        return res.json({
            message : "No se ha encontrado ningun jugador"
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
