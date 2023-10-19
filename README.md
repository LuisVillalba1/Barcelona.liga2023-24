# FC Barcelona liga 2023-2024

![Barcelona_logo](https://a57.foxsports.com/statics.foxsports.com/www.foxsports.com/content/uploads/2023/03/1408/814/barcelona1.jpg?ve=1&tl=1)
Esta api esta enfocada en el futbol club barcelona en la liga actual(2023-2024),el cual se encuentra actualizada hasta el dia de la fecha (2023-17-10).

Para llevarla a cabo utilize la siguientes tecnologias :

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/es)
- [Express](https://www.npmjs.com/package/express)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Cors](https://www.npmjs.com/package/cors)
- [TypeORM](https://typeorm.io/)
- [Dotenv](https://www.npmjs.com/package/dotenv) si utilizas algun medio para desplazar la aplicacion web

Para poder utilizarla es importante tener instalado node.js y mysql.

En el se podran visualizar distintos datos como:
-Partidos jugados
-Jugadores
-Goles convertidos
-Tarjetas recibidas
-Rivales

------------

## Tabla de contenidos

- [Comenzar](#comenzar)
  - [Instalar](#instalar)
- [Visualizar Datos](#visualizar-datos)
  - [Filtrar Datos](#filtrar-datos)
    - [Partidos](#partidos)
    - [Goles](#goles)
    - [Tarjetas](#tarjetas)
- [Insertar Datos](#insertar-datos)
  - [Solicitudes](#solicitudes)
    - [Insertar Jugador](#insertar-jugador)
    - [Insertar Rival](#insertar-rival)
    - [Insertar Partido](#insertar-partido)
    - [Insertar Gol](#insertar-gol)
    - [Insertar Tarjeta](#insertar-tarjeta)
- [Modificar Datos](#modificar-datos)
  - [Método Put](#método-put)
  - [Método Patch](#método-patch)
- [Eliminar Datos](#eliminar-datos)
- [Guardar Cambios](#guardar-cambios)

------------

### comenzar

#### instalar

Para comenzar lo primero que deben de hacer es descargar el repositorior, para ello van al respositorio,en la seccion verde < code > y descargan el zip.

#### Correr programa Localmente

Posterior a la descarga deberan abrir la carpeta en un editor de codigo y correr en la terminar el siguiente comando

`npm run start`

------------

Finalmente abre tu navegador y escribe en tu buscador `http://localhost:3000/api/partidos`

### visualizar-datos

Podras acceder a los datos de los partidos,jugadores,tarjetas,rivales y goles.
Para ellos podras utilizar las siguientes rutas

-`http://localhost:3000/api/partidos`
-`http://localhost:3000/api/goles`
-`http://localhost:3000/api/rivales`
-`http://localhost:3000/api/jugadores`
-`http://localhost:3000/api/tarjetas`

Tambien podemos acceder a un objeto en concreto si le agregamo a lo ultimo el valor de la llave primaria del mismo por ejemplo.

`http://localhost:3000/api/partidos/2`

Con esto estaremos accediendo al segundo partido.

------------

### filtrar-datos

Tambien podras hacer algunos filtros a los datos, utilizando query params. Como por ejemplo obtener partidos ganados,perdidos y empatados; asi como tambien poder ordenar los goles por jugadores;y las tarjetas por jugadores y color de tarjeta.

#### partidos

Para obtener los partidos segun su resultado, es decir (victoria, empate o derrota) podran filtrar los datos de la siguiente manera:

- `http://localhost:3000/api/partidos?mostrar=ganados`
- `http://localhost:3000/api/partidos?mostrar=empatados`
- `http://localhost:3000/api/partidos?mostrar=perdidos`

#### goles

Podras ordenar los goles segun los jugadores,para ellos deberas de utilizar la siguiente querry:

- `http://localhost:3000/api/goles?ordenar=jugadores`

Esto te permitira visualizar de manera ordenada los goles convertidos por cada jugador del plantel.

#### tarjetas

Tendras la opcion de ordenar las tarjetas segun el color o los jugadores, para ello deberas de utilizar las siguientes querrys:

- `http://localhost:3000/api/tarjetas?ordenar=jugadores`
- `http://localhost:3000/api/tarjetas?ordenar=tarjetas`

Con el ordenamiento por jugadores, visulizaras las tarjetas recibidas por cada jugador de manera ordena.

Y por el otro lado, con el ordenamiento por tarjetas podras obtener las tarjetas ordenadas comenzando por las amarillas y mostrando luego las rojas recibidas.

### insertar-datos

Para insertar nuevos datos es muy importante seguir el siguiente orden: Primero se deberian de insertar los jugadores y rivales, luego los partidos y finalmente las tarjetas y goles.

Este orden es muy importante a la hora de ingresar nuevos datos, si bien los rivales ya se encuentran todos disponibles, los jugadores podrian variar, podrian ingresar nuevos jugadores al plantel e irse otros.

#### solicitudes

Para insertar datos,modificarlos y eliminarlos, deberas de utilizar un medio para manerjar este tipo de solicitudes, para ello te recomiento **thunder client**.

En el podras realizar solicitudes de tipo get, post, patch, put y delete. Estas son las que utilizaras para manejar esta api de forma efectiva.

El body aceptara solamente formatos de tipo **JSON**.

#### insertar-jugador

Para insertar un nuevo jugador se debera de realizar una solicitud de tipo **Post** a la siguiente url:

`http://localhost:3000/api/jugadores`

La tabla jugadores solo admitiran datos como nombre y apellido, camiseta, y estado actual en el club.Un ejemplo para insertar un nuevo jugadores sera el siguiente:

`
{
"Nombre_apellido" : "lamine yamall","Camiseta" : 17,"Enclub" : true
}
`

Cabe resaltar que en nombre_apellido solo se aceptan strings, en camiseta number y Enclub(El cual hace referencia a si el jugador se encuentra actualmente en el club) boolean.

#### insertar-rival

Para insertar un nuevo rival se debera de realizar una solicitud **Post** a la siguiente url:

`http://localhost:3000/api/rivales`

Si bien todos los rivales de la liga actual se encuentran almacenados, en caso de eliminar uno por equivocacion, podran cargarlos de nuevo de la siguiente manera :

`
"Nombre" : "Real betis","Estadio" :  "Estadio Benito Villamarín"
`

#### insertar-partido

Para insertar un nuevo partido se debera de realizar una solicitud de tipo **Post** a la siguiente url:

`http://localhost:3000/api/partidos`

El body debera de de tener el siguiente formato:

`{
"RivalID" : 1,"GolesRival" : 0,"EstadioJugado" : "Camp nou","Fecha" : "2023-08-03"
}`

Para ingresar un nuevo partido debera de existir el rival correspondiente.

GolesRival hace referencia a la cantidad de goles anotados por parte del rival y fecha al dia en que se jugo el partido, el cual solo admite formatos de tipo date.

#### insertar-gol

Para insertar un nuevo gol, debe de realizar una solicitud **Post** al siguiente link:

`http://localhost:3000/api/goles`

Con un body con el siguiente formato:

`
"JugadorID" : 2,"Minuto" : "90:00","PartidoID": 1
`

Es importante resaltar de que para ingresar un nuevo Gol debe de existir previamente un partido y jugador, de lo contrario no se podra insertar un nuevo gol.

En caso de que el gol fuera dentro del primer tiempo, en tiempo extra, insertar 45:00, y si el gol es despues de los 90 ingresar el minuto exacto, por ejemplo 94:00.

Por ultimo si el gol es en propia puerta por parte del rival, JugadorID debera de recibir como valor el numero 23.

#### insertar-tarjeta

Para Agregar una nueva tarjeta a nuestra api se debera de realizar una solicitud **Post** a la siguiente url:

`http://localhost:3000/api/tarjetas`

El body debera de contener el siguiente formato:

`{"Color": "Amarilla","JugadorID" : 2,"PartidoID" : 1}`

Resaltemos que para ingresar una nueva tarjeta el jugador y el partido deben de existir,como asi tambien Color solo admite como valores Amarilla o Roja.

------------

### modificar-datos

Para modificar datos podemos utilizar dos tipos de solicitudes, **Put** y **Patch**.

Cuando querramos modificar el objeto entero deberiamos de utilizar el metodo put y cuando querramos modificar ciertos valores utilizaremos el metodo patch.

Ambos tipo de solicitudes van a tener la misma url solo que al final, se le agregaria /id,
donde id seria el valor de la llave primaria del objeto que queremos modificar. por ejemplo para modificar el gol numero 1, pondriamos /1.

#### método-put

Para modificar un objeto por completo utilizaremos la solicitud de tipo **Put**

Un ejemplo para modificar un gol en especifico seria hacer una solicitud al siguiente link:

`http://localhost:3000/api/goles/1`

Donde el ultimo valor de la url, luego de la barra, es el ID del gol en concreto.

Luego mandaremos los nuevos valores del objeto,por ejemplo:

`{"JugadorID" : 14,"Minuto" : "43:00","PartidoID" : 4}`

#### método-patch

En la solicitudes de tipo **patch**no hace falta pasar todas las propiedades que contiene el objeto.

Por ejemplo para modificar un gol podemos pasarle unicamente el JugadorID o el Minuto en que se convirtio el gol.

### eliminar-datos

Para eliminar un objeto utilizaremos la solicitud de tipo **Delete**

Cuidado con este meto, ya que si eliminamos un gol, ese ya no se encontrara asociado al partido correspondiente, por lo cual si queremos que si se vea reflejado tendremos que crear un nuevo gol.

#### Delete

Para eliminar un objeto es muy facil, utilizaremos casi el mismo formato que utilizamos para las solicitudes put y patch.

Haremos una solicitud de tipo **Delete** a la url en cuestion,con la id del propio objeto que querramos eliminar,por ejemplo:

`http://localhost:3000/api/goles/2`

Aqui estaremos eliminando el gol con GolID como valor 2.

------------

### guardar-cambios

A la hora de trabajar como desarollador te sera sencillo ver los cambios utilzando el script

`npm run dev`

Una vez tengas los cambios hechos es importante hacer

`npm run tsc`

`npm run start`

Para que los cambios hechos se vean reflejados.
[EOF]
