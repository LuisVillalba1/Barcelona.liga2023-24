import { Router } from "express";
import { deletePartido, getPartidoID, getPartidos, patchPartido, postPartido, putPartido } from "../connections/partidos";


const routerPartidos = Router();

routerPartidos.post("/",(req,res)=>{
    postPartido(req,res)
})

routerPartidos.get("/",(req,res)=>{
    getPartidos(req,res)
})

routerPartidos.get("/:id",(req,res)=>{
    getPartidoID(req,res)
})

routerPartidos.put("/:id",(req,res)=>{
    putPartido(req,res)
})

routerPartidos.patch("/:id",(req,res)=>{
    patchPartido(req,res)
})

routerPartidos.delete("/:id",(req,res)=>{
    deletePartido(req,res)
})

export default routerPartidos