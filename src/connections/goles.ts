import { Request,Response } from "express"
import { dataSource } from "../db/db"
import { crearNuevoGol, queryOrdenarGoles, verificarJugadorID, verificarMinuto, verificarPartido } from "../utils/goles.utils"
import { Goles } from "../entity/goles";
import { Jugadores } from "../entity/jugadores";
import { Partidos } from "../entity/partidos";
import { deleteDataRepository, getDataIDRepository,getDataRepository} from "../utils/utils";

export const postGoles = async(req : Request, res : Response):Promise<Goles| object>=>{
    try{
        const gol = crearNuevoGol(req.body);
    
        const jugadorRepository = dataSource.getRepository(Jugadores);
        const jugador  = await jugadorRepository.findOneBy({
            JugadorID : gol.JugadorID
        })
        const partidoRepository = dataSource.getRepository(Partidos);
        const partido = await partidoRepository.findOneBy({
            PartidoID : gol.PartidoID
        })
        if(jugador){
            if(partido){
                const nuevoGol = new Goles();
                nuevoGol.Minuto = gol.Minuto;
                nuevoGol.Jugador = jugador
                nuevoGol.Partido = partido
            
                await dataSource.manager.save(nuevoGol);
                return res.json(nuevoGol)
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

export const GetGoles =async (req : Request,res : Response)=> {
    if(Object.keys(req.query).length > 0){
        await queryOrdenarGoles(req,res);
    }
    else{
        await getDataRepository(res,Goles,"gol",["Jugador","Partido"]);
    }
}

export const getGolID =async (req : Request, res: Response)=> {
    await getDataIDRepository(req,res,Goles,"GolID","gol",["Jugador","Partido"]);
}

export const putGol =async (req : Request, res : Response):Promise<object> => {
    try{
        const {id} = req.params;
        const nuevoGol = crearNuevoGol(req.body)
        const golesRepository = dataSource.getRepository(Goles);
        const gol = await golesRepository.findOneBy({
            GolID : parseInt(id)
        })
        const partidoRepository = dataSource.getRepository(Partidos);
        const partido = await partidoRepository.findOneBy({
            PartidoID : nuevoGol.PartidoID
        })
        const jugadorRepository = dataSource.getRepository(Jugadores);
        const jugador = await jugadorRepository.findOneBy({
            JugadorID : nuevoGol.JugadorID
        })
        if(gol){
            if(partido){
                if(jugador){
                    gol.Minuto = nuevoGol.Minuto;
                    gol.Jugador = jugador;
                    gol.Partido = partido

                    await golesRepository.save(gol)
                    return res.json({
                        message : "Se ha modificado el gol correctamente"
                    })
                } 
                return res.json({
                    message : "No se ha encontrado el jugador correspondiente"
                })  
            }
            return res.json({
                message : "No se ha encontrado el partido correspondiente"
            })
        }
        return res.json({
            message : "No se ha encontrado el gol correspondiente"
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

export const pathGol =async (req : Request, res : Response):Promise<object> => {
    try{
        const {id} = req.params;
        const golesRepository = dataSource.getRepository(Goles);
        const gol = await golesRepository.findOneBy({
            GolID : parseInt(id)
        })
        if(gol){
            const {JugadorID,PartidoID,Minuto} = req.body;
            if(JugadorID){
                const nuevoJugadorID = verificarJugadorID(req.body);
                const jugadorRepository = dataSource.getRepository(Jugadores);
                const jugador = await jugadorRepository.findOneBy({
                    JugadorID : nuevoJugadorID
                })
                if(jugador){
                    gol.Jugador = jugador;
                }
                else{
                    return res.json({
                        message : "No se ha encontrado el jugador correspondiente"
                    })
                }
            }
            if(PartidoID){
                const nuevoPartidoID = verificarPartido(req.body);
                const partidoRepository = dataSource.getRepository(Partidos);
                const partido = await partidoRepository.findOneBy({
                    PartidoID : nuevoPartidoID
                })
                if(partido){
                    gol.Partido = partido;
                }
                else{
                    return res.json({
                        message : "No se ha encontrado el partido correspondiente"
                    })
                }
            }
            if(Minuto){
                const nuevoMinuto = verificarMinuto(req.body);
                gol.Minuto = nuevoMinuto
            }
            
            await golesRepository.save(gol);
            return res.json({
                message : "Se ha modificado el gol correctamente"
            })
        }
        return res.json({
            message : "No se ha encontrado el gol correspondiente"
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

export const deleteGol =async (req : Request, res : Response) => {
    deleteDataRepository(req, res,Goles,"GolID","gol")
}