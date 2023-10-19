import { Response,Request } from "express"
import { Entity } from "../types"
import { dataSource } from "../db/db"


export const isString = (string : any):boolean=>{
    return typeof string == "string"
}

export const isNumber = (number : any):boolean=>{
    return typeof number == "number"
}

export const isBoolean = (boolean : any):boolean=>{
    if(typeof boolean == "boolean"){
        if(boolean){
            return true
        }
        return false
    }
    throw new Error("Formato de En club invalido, espera solo True o False")
}

export const isMinuto = (string: any): boolean => {
    if (isString(string)) {
        // Nuevo formato para verificar los minutos ingresados
        const regex = /^\d{2,3}:\d{2}$/;

        return regex.test(string);
    }
    throw new Error("Formato de minuto no válido");
}

export const isFecha = (string : any):boolean=>{
    if(isString(string)){
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(string)
    }
    throw new Error("Formato de fecha no valida")
}


export const getDataRepository =async (res : Response, entityRepository : Entity,entity : string,relations : Array<string | never>):Promise<Entity[] | object> => {
    try{
        const repository = dataSource.getRepository(entityRepository)
        if(relations.length <= 0){
            let data = await repository.find();
            if(data.length >= 1){
                return res.json(data)
            }
            return res.json({
                message : `Lo siento no se encuentra ningun ${entity} disponible por el momento`
            })
        }
        else{
            let dataRelations = await repository.find({
                relations : relations
            })
            if(dataRelations.length >= 1){
                return res.json(dataRelations)
            }
            return res.json({
                message : `Lo siento no se encuentra ningun ${entity} disponible por el momento`
            })
        }
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

export const getDataIDRepository = async (req : Request,res : Response, entityRepository : Entity,primaryColumn : string,entity : string,relations : Array <string | never>):Promise<Entity[]| Entity | object> => {
    try{
        const respository = dataSource.getRepository(entityRepository)
        const {id} = req.params
        if(relations.length == 0){
            let data = await respository.findOneBy({
                [primaryColumn] : parseInt(id)
            })
            if(data){
                return res.json(data)
            }
            return res.json({
                message : `no se ha encontrado ningun ${entity}`
            })
        }
        else{
            let dataRelations = await respository.find({
                where :{
                    [primaryColumn] : parseInt(id)
                },
                relations : relations
            })
            if(dataRelations.length > 0){
                return res.json(dataRelations)
            }
            return res.json({
                message : `No se ha encontrado ningun ${entity}`
            })
        }
    }
    catch(e){
        if(e instanceof Error){
            return res.json({
                message : e.message
            })
        }
        return res.json({
            messge : "Error desconocido"
        })
    }
}

export const deleteDataRepository =async (req : Request, res : Response,entityRepository : Entity,primaryColumn : string,entity : string):Promise<object> => {
    try{
        const respository = dataSource.getRepository(entityRepository);
        const {id} = req.params;
        const data = await respository.findOneBy({
            [primaryColumn] : id
        })
        if(data){
            await respository.remove(data);
            return res.json({
                message : `Se ha eliminado el objeto correctamente`
            })
        }
        return res.json({
            message : `No se ha encontrado ningun ${entity} correspondiente`
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