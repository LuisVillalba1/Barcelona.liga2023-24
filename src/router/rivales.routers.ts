import { Router } from "express";
import {deleteRival, getRivalID, getRivales, pathRival, postRivales, putRival } from "../connections/rivales";

const routerRivales = Router();

routerRivales.post("/",(req,res)=>{
    postRivales(req,res)
})

routerRivales.get("/:id",(req,res)=>{
    getRivalID(req,res)
})

routerRivales.get("/",(_req,res)=>{
    getRivales(res)
})

routerRivales.put("/:id",(req,res)=>{
    putRival(req,res)
})

routerRivales.patch("/:id",(req,res)=>{
    pathRival(req,res)
})

routerRivales.delete("/:id",(req,res)=>{
    deleteRival(req,res)
})


export default routerRivales