import { Tarjetas } from "../entity/tarjetas";
import { Request,Response } from "express";
import { crearNuevaTarjeta, queryOrdenarTarjetas, verificarColor, verificarJugador, verificarPartido } from "../utils/tarjetas.utils";
import { dataSource } from "../db/db";
import { Jugadores } from "../entity/jugadores";
import { Partidos } from "../entity/partidos";
import { deleteDataRepository, getDataIDRepository, getDataRepository } from "../utils/utils";


export const postTarjetas =async (req : Request, res : Response):Promise<Tarjetas | object> => {
    try{
        const tarjeta = crearNuevaTarjeta(req.body);
        const nuevaTarjeta = new Tarjetas();

        const jugadorRepository = dataSource.getRepository(Jugadores);
        const jugador = await jugadorRepository.findOneBy({
            JugadorID : tarjeta.JugadorID
        })
        const partidoRepository = dataSource.getRepository(Partidos);
        const partido = await partidoRepository.findOneBy({
            PartidoID : tarjeta.PartidoID
        })

        if(jugador){
            if(partido){
                nuevaTarjeta.Jugador = jugador;
                nuevaTarjeta.Partido = partido;
                nuevaTarjeta.color = tarjeta.Color;

                dataSource.manager.save(nuevaTarjeta);
                return res.json(nuevaTarjeta)
            }
            return res.json({
                message : "No se ha encontrado el partido correspondiente"
            })
        }
        return res.json({
            message : "No se ha encontrado el jugador correspondiente"
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

export const getTarjetas =async (req : Request,res : Response)=> {
    if(Object.keys(req.query).length > 0){
        queryOrdenarTarjetas(req,res)
    }
    else{
        await getDataRepository(res,Tarjetas,"tarjeta",["Jugador","Partido"]);
    }
}

export const getTarjetaID =async (req : Request, res : Response)=> {
    await getDataIDRepository(req,res,Tarjetas,"TarjetaID","tarjeta",["Jugador","Partido"]);
}

export const putTarjeta =async (req : Request, res : Response):Promise<object> => {
    try{
        const {id} = req.params;
        const nuevaTarjeta = crearNuevaTarjeta(req.body);
        const tarjetasRespository = dataSource.getRepository(Tarjetas);
        const tarjeta = await tarjetasRespository.findOneBy({
            TarjetaID : parseInt(id)
        })
        if(tarjeta){
            const jugadorRepository = dataSource.getRepository(Jugadores);
            const jugador = await jugadorRepository.findOneBy({
                JugadorID : nuevaTarjeta.JugadorID
            })
            if(jugador){
                const partidoRepository = dataSource.getRepository(Partidos);
                const partido = await partidoRepository.findOneBy({
                    PartidoID : nuevaTarjeta.PartidoID
                })
                if(partido){
                    tarjeta.Jugador = jugador;
                    tarjeta.Partido = partido;
                    tarjeta.color = nuevaTarjeta.Color;

                    await tarjetasRespository.save(tarjeta);
                    return res.json({
                        message : "Se ha modificado la tarjeta correctamente"
                    })
                }
                return res.json({
                    message : "No se ha encontrado el partido correspondiente"
                })
            }
            return res.json({
                message : "No se ha encontrado el jugador correspondiente"
            })
        }
        return res.json({
            message : "No se ha encontrado la tarjeta correspondiente"
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

export const patchTarjeta =async (req : Request,res : Response):Promise<object> => {
    try{
        const {id} = req.params;
        const tarjetasRespository = dataSource.getRepository(Tarjetas);
        const tarjeta = await tarjetasRespository.findOneBy({
            TarjetaID : parseInt(id)
        })
        if(tarjeta){
            const {Color,PartidoID,JugadorID} = req.body;
            if(Color){
                const nuevoColor = verificarColor(req.body);
                tarjeta.color = nuevoColor;
            }
            if(PartidoID){
                const nuevoPartidoID = verificarPartido(req.body);
                const partidoRepository = dataSource.getRepository(Partidos);
                const partido = await partidoRepository.findOneBy({
                    PartidoID : nuevoPartidoID
                })
                if(partido){
                    tarjeta.Partido = partido;
                }
                else{
                    return res.json({
                        message : "No se ha encontrado el partido correspondiente"
                    })
                }
            }
            if(JugadorID){
                const nuevoJugadorID = verificarJugador(req.body);
                const jugadorRepository = dataSource.getRepository(Jugadores);
                const jugador = await jugadorRepository.findOneBy({
                    JugadorID : nuevoJugadorID
                })
                if(jugador){
                    tarjeta.Jugador = jugador;
                }
                else{
                    return res.json({
                        message : "No se ha encontrado el jugador correspondiente"
                    })
                }
            }
            await tarjetasRespository.save(tarjeta);
            return res.json({
                message : "Se ha modificado la tarjeta correctamente"
            })
        }
        return res.json({
            message : "No se ha encontrado la tarjeta correspondiente"
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

export const deleteTarjeta = async(req : Request, res : Response)=>{
    await deleteDataRepository(req, res,Tarjetas,"TarjetaID","tarjeta")
}