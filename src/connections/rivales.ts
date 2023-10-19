import { Request,Response } from "express";
import { Rivales } from "../entity/rivales";
import { dataSource } from "../db/db";
import { crearNuevoRival } from "../utils/rivales.utils";
import { deleteDataRepository, getDataIDRepository, getDataRepository } from "../utils/utils";

export const postRivales = async(req : Request, res : Response):Promise<Rivales | object>=>{
    try{
        const rival = crearNuevoRival(req.body);
        const nuevoRival = new Rivales();
        nuevoRival.Nombre = rival.Nombre;
        nuevoRival.Estadio = rival.Estadio;

        await dataSource.manager.save(nuevoRival);
        return res.json(nuevoRival)
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

export const getRivalID = async(req : Request, res : Response)=>{
    await getDataIDRepository(req,res,Rivales,"RivalID","rival",[]);
}

export const getRivales = async(res : Response)=>{
    await getDataRepository(res,Rivales,"rival",[]);
}

export const putRival = async(req : Request, res : Response):Promise<object>=>{
    try{
        const rivalRepository = dataSource.getRepository(Rivales);
        const {id} = req.params
        const rival = await rivalRepository.findOneBy({
            RivalID : parseInt(id)
        })
        if(rival){
            const nuevoRivalData = crearNuevoRival(req.body);
            rival.Nombre = nuevoRivalData.Nombre;
            rival.Estadio = nuevoRivalData.Estadio;
            await rivalRepository.save(rival);
            return res.json({
                message : "Se ha actualizado el rival correctamente"
            })
        }
        return res.json({
            message : "No se ha encontrado ningun rival"
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

export const pathRival = async(req : Request, res : Response):Promise<Rivales | object>=>{
    try{
        const rivalRepository = dataSource.getRepository(Rivales);
        const {id} = req.params
        const rival = await rivalRepository.findOneBy({
            RivalID : parseInt(id)
        })
        if(rival){
            const {Nombre,Estadio} = req.body;
            if(Nombre != undefined){
                if(typeof Nombre == "string"){
                    rival.Nombre = Nombre
                }
                else{throw new Error("Formato de rival no valido")}
            }
            if(Estadio != undefined){
                if(typeof Estadio == "string"){
                    rival.Estadio = Estadio
                }
                else{throw new Error("Formato de estadio no valido")}
            }
            await rivalRepository.save(rival);
            return res.json(rival)
        }
        return res.json({
            message : "No se ha encontrado ningun rival"
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

export const deleteRival = async(req : Request, res : Response)=>{
    await deleteDataRepository(req,res,Rivales,"RivalID","rival")
}