import { Request,Response } from "express";
import { crearNuevoPartido, queryOrdenarPartidos, verificarEstadioJugado, verificarFecha, verificarGolesRival, verificarRivalID } from "../utils/partidos.utils";
import { Partidos } from "../entity/partidos";
import { dataSource } from "../db/db";
import { Rivales } from "../entity/rivales";
import { deleteDataRepository, getDataRepository } from "../utils/utils";

export const postPartido =async (req : Request, res : Response):Promise<Partidos | object>=>{
    try{
        const partido = crearNuevoPartido(req.body);
        
        const rivalRepository = dataSource.getRepository(Rivales);
        const rival = await rivalRepository.findOneBy({
            RivalID : partido.RivalID
        })
        if(rival){
            const nuevoPartido = new Partidos();
            nuevoPartido.GolesRival = partido.GolesRival;
            nuevoPartido.Fecha = partido.Fecha;
            nuevoPartido.EstadioJugado = partido.EstadioJugado;
            nuevoPartido.Rival = rival
    
            await dataSource.manager.save(nuevoPartido);
            return res.json(nuevoPartido)
        }
        return res.json({
            message : "No se ha encontrado el rival correspondiente"
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

export const getPartidos =async (req : Request,res : Response)=> {
    if(Object.keys(req.query).length > 0){
        queryOrdenarPartidos(req,res)
    }
    else{
        await getDataRepository(res,Partidos,"partido",["Goles","Rival"]);
    }
}

export const getPartidoID =async (req: Request, res : Response):Promise<Partidos | object> => {
    try{
        const {id} = req.params;
        const partidoRepository = dataSource.getRepository(Partidos);
        const partido = await partidoRepository.find({
           where : {
                PartidoID : parseInt(id)
           },
           relations : ["Goles","Rival"]
        });
        if(partido.length >= 1){
            return res.json(partido)
        }
        return res.json({
            message : "No se ha encontrado el partido correspondiente"
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

export const putPartido =async (req : Request, res : Response):Promise<object> => {
    try{
        const {id} = req.params;
        const partidoRepository = dataSource.getRepository(Partidos);
        const partido = await partidoRepository.findOneBy({
            PartidoID : parseInt(id)
        })
        const nuevoPartido = crearNuevoPartido(req.body);
        const rivalRepository = dataSource.getRepository(Rivales);
        const rival = await rivalRepository.findOneBy({
            RivalID : nuevoPartido.RivalID
        })
        if(partido){
            if(rival){
                partido.GolesRival = nuevoPartido.GolesRival;
                partido.Fecha = nuevoPartido.Fecha;
                partido.EstadioJugado = nuevoPartido.EstadioJugado;
                partido.Rival = rival;

                await partidoRepository.save(partido);
                return res.json({
                    message : "Se ha modificado el partido correctamente"
                })
            }
            return res.json({
                message : "No se ha encontrado el rival correspondiente"
            })
        }
        return res.json({
            message : "No se ha encontrado el partido con el correspondiente id"
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

export const patchPartido =async (req : Request, res : Response):Promise<object> => {
    try{
        const {id} = req.params;
        const partidoRepository = dataSource.getRepository(Partidos);
        const partido = await partidoRepository.findOneBy({
            PartidoID : parseInt(id)
        })
        if(partido){
            const {RivalID,GolesRival,Fecha,EstadioJugado} = req.body;
            if(typeof GolesRival != "undefined"){
                partido.GolesRival = verificarGolesRival(req.body);
            }
            if(Fecha){
                partido.Fecha = verificarFecha(req.body)
            }
            if(EstadioJugado){
                partido.EstadioJugado = verificarEstadioJugado(req.body)
            }
            if(RivalID){
                const rivalID = verificarRivalID(req.body);
                const rivalRepository = dataSource.getRepository(Rivales);
                const rival = await rivalRepository.findOneBy({
                    RivalID : rivalID
                })
                if(rival){
                    partido.Rival = rival
                }
                else{
                    return res.json({
                        message : "No se ha encontrado el rival correspondiete"
                    })
                }
            }
            partidoRepository.save(partido);
            return res.json({
                message : "Se han actualizado los datos correctamente"
            })
        }
        return res.json({
            message : "No se ha encontrado el partido correspondiente"
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

export const deletePartido = async(req : Request, res : Response)=>{
    await deleteDataRepository(req,res,Partidos,"PartidoID","partido")
}