import { Router } from "express";
import { deleteTarjeta, getTarjetaID, getTarjetas, patchTarjeta, postTarjetas, putTarjeta } from "../connections/tarjetas";

const routerTarjetas = Router();

routerTarjetas.post("/",(req,res)=>{
    postTarjetas(req,res)
})

routerTarjetas.get("/",(req,res)=>{
    getTarjetas(req,res)
})

routerTarjetas.get("/:id",(req,res)=>{
    getTarjetaID(req,res)
})

routerTarjetas.put("/:id",(req,res)=>{
    putTarjeta(req,res)
})

routerTarjetas.patch("/:id",(req,res)=>{
    patchTarjeta(req,res)
})

routerTarjetas.delete("/:id",(req,res)=>{
    deleteTarjeta(req,res)
})

export default routerTarjetas