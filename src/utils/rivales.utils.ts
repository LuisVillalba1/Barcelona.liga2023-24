import { Rival } from "../types";
import { isString } from "./utils";

const verificarNombre = (object : object | Rival)=>{
    if("Nombre" in object){
        if(isString(object.Nombre)){
            return object.Nombre
        }
        throw new Error("Formato de equipo no valido")
    }
    throw new Error("Falta la propiedad Nombre")
}

const verificarEstadio = (object : object | Rival)=>{
    if("Estadio" in object){
        if(isString(object.Estadio)){
            return object.Estadio
        }
        throw new Error("Formato de estadio no valido")
    }
    throw new Error("Falta la propiedad Estadio")
}

export const crearNuevoRival = (object : Rival | object)=>{
    const nuevoRival : Rival= {
        Nombre : verificarNombre(object),
        Estadio : verificarEstadio(object)
    } 
    return nuevoRival
}