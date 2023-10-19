import { Router } from "express";
import { getJugadores, postJugadores,putJugador,pathJugador } from "../connections/jugadores";
import { getJugadorID } from "../connections/jugadores";


const routerJugadores = Router();


routerJugadores.post("/",(req,res)=>{
    postJugadores(req,res)
})

routerJugadores.get("/:id",(req,res)=>{
    getJugadorID(req,res);
})

routerJugadores.get("/",(_req,res)=>{
    getJugadores(res)
})

routerJugadores.put("/:id",(req,res)=>{
    putJugador(req,res)
})

routerJugadores.patch("/:id",(req,res)=>{
    pathJugador(req,res)
})


export default routerJugadores;