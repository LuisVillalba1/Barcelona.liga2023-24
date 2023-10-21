
import express from "express";
import morgan from "morgan";
import cors from "cors";
import routerJugadores from "./router/jugadores.routers";
import routerRivales from "./router/rivales.routers";
import routerPartidos from "./router/partidos.router";
import routerGoles from "./router/goles.router";
import routerTarjetas from "./router/tarjetas.router";
import { Request,Response } from "express";

const app = express();
//nos brinda detalles sobre las solicitudes recibidas
app.use(morgan("dev"));
//permite realizar solicitudes desde orgines diferentes
app.use(cors());

//convertimos todos los objetos recibidos en las solicitudes de json a objeto
app.use(express.json());

//rutas que utilizamos
app.use("/api/jugadores/",routerJugadores);
app.use("/api/rivales/",routerRivales);
app.use("/api/goles/",routerGoles);
app.use("/api/partidos/",routerPartidos);
app.use("/api/tarjetas/",routerTarjetas);
app.use("/api/",(_req,res)=>{
    res.send("Bienvenidos a mi api sobre el futbol club barcelona en la liga local 2023-2024")
})

//en caso de que se ingrese cualquier otra ruta no especificada
app.use("*",(_req : Request,res : Response)=>{
    res.send({
        message : "Ruta no encontrada"
    })
})

export default app