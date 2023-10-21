import { Router } from "express";
import { getJugadores, postJugadores,putJugador,pathJugador } from "../connections/jugadores";
import { getJugadorID } from "../connections/jugadores";


const routerJugadores = Router();

//ruta para agregar un jugador
routerJugadores.post("/",(req,res)=>{
    postJugadores(req,res)
})

//ruta para obtener todos los jugadores
routerJugadores.get("/",(_req,res)=>{
    getJugadores(res)
})


routerJugadores.get("/:id",(req,res)=>{
    getJugadorID(req,res);
})


routerJugadores.put("/:id",(req,res)=>{
    putJugador(req,res)
})


routerJugadores.patch("/:id",(req,res)=>{
    pathJugador(req,res)
})


export default routerJugadores;