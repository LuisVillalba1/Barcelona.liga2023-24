import { Router } from "express";
import { GetGoles, deleteGol, getGolID, pathGol, postGoles, putGol } from "../connections/goles";

const routerGoles = Router();


routerGoles.post("/",(req,res)=>{
    postGoles(req,res)
})


routerGoles.get("/",(req,res)=>{
    GetGoles(req,res)
})


routerGoles.get("/:id",(req,res)=>{
    getGolID(req,res)
})


routerGoles.put("/:id",(req,res)=>{
    putGol(req,res)
})


routerGoles.patch("/:id",(req,res)=>{
    pathGol(req,res)
})


routerGoles.delete("/:id",(req,res)=>{
    deleteGol(req,res)
})

export default routerGoles