import "reflect-metadata";
import app from "./app";
import { dataSource } from "./db/db";

const main = async()=>{
    try{
        await dataSource.initialize();
        console.log("connection a la base de datos completada")
        const PUERTO = process.env.PORT ?? 3000;
        app.listen(PUERTO,()=>{
            console.log(`servidor escuchando en el puerto ${PUERTO}`)
        })
    }
    catch(e){
        console.log(e)
    }
}

main()