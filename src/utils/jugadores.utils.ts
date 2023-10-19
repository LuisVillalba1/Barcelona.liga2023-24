import { Jugador } from "../types"
import { isString,isNumber, isBoolean } from "./utils"

const verficarNombres = (objet : Jugador | object):string=>{
    if("Nombre_apellido" in objet){
        if(isString(objet.Nombre_apellido)){
            return objet.Nombre_apellido
        }
        throw new Error("El formato del nombre y apellido no es correcto");
    }
    throw new Error("Formato de objeto no valido, falta la propiedad Nombre_apellido")
}

const verificarCamiseta = (object : Jugador | object):number=>{
    if("Camiseta" in object){
        if(isNumber(object.Camiseta)){
            return object.Camiseta
        }
        throw new Error("Camiseta invalida")
    }
    throw new Error("Formato de objeto no valido, falta la propiedad Camiseta")
}

const verificarEstadoClub = (object : Jugador | object):boolean=>{
    if("Enclub" in object){
        const enClubData = isBoolean(object.Enclub)
        return enClubData
    }
    throw new Error("Formato de objeto no valido, falta la propiedad Enclub")
}

export const crearNuevoJugador = (object : Jugador | object):Jugador=>{
    const nuevoJugador : Jugador ={
        Nombre_apellido : verficarNombres(object),
        Camiseta : verificarCamiseta(object),
        Enclub : verificarEstadoClub(object)
    }
    return nuevoJugador
}
