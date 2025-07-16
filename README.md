TP NRO 8

-Instalar Express.js

-Limpiar el archivo index.js

-Crear un proyecto de Express.js en base al ejemplo de la clase

-Asegurarse de que el archivo package.json tenga type: "module"

-Elegir una Entidad de su proyecto (que no sean los usuarios) y crear las rutas GET (PARA TODOS LOS ELEENTOS), POST, PUT y DELETE para ella 

-Dentro de cada ruta, se debería devolver un JSON con el mensaje “Esta es la ruta [método] de mi entidad [entidad]”

-Adicional: Crea una ruta adicional GET / que devuelva un JSON con el mensaje “Bienvenido a la API de [proyecto]”

-Recomendacion:  usar Thunder client o Postman para probar las rutas

---------------------------------------------------------------------------------------------------------------------------------------------------
Trabajo Práctico Nº9
Temas: Rutas y Modularización

Consigna

Modularizá tus rutas A partir del trabajo práctico anterior, mové todas las rutas que tengas al momento a un archivo separado.

Por ejemplo: si tenías las rutas en server.js, pasalas a routes/entidad.routes.js y luego importalas en el archivo principal (server.js).

Agregá una ruta dinámica GET Incorporá una nueva ruta del tipo GET /{entidad}/:id. Esta debe responder con un JSON que tenga el mensaje: “Esta es la ruta GET de mi entidad {entidad} con el ID {id}” (Reemplazá {id} por lo que recibís en la URL).

Agregá el parámetro :id también en las rutas DELETE y PUT Modificá tus rutas DELETE /{entidad} y PUT /{entidad} agregándoles el parámetro :id para que devuelvan un mensaje similar, incluyendo el ID recibido como parámetro.

Elegí otra entidad de tu proyecto y creá todas sus rutas Elegí una segunda entidad distinta a la del punto anterior. Para esa nueva entidad, creá un archivo nuevo con las siguientes rutas:

GET /{entidad} – debe devolver un mensaje indicando que muestra todos los elementos.
GET /{entidad}/:id – debe devolver un mensaje con el ID recibido.
POST /{entidad} – mensaje de creación.
PUT /{entidad}/:id – mensaje con ID.
DELETE /{entidad}/:id – mensaje con ID.
Todas las respuestas deben ser en formato JSON con un mensaje como: “Esta es la ruta <método> de mi entidad {entidad} con el ID {id}”

Por si pinta…

Centralizá tus rutas en un archivo routes/index.js
Creá un archivo routes/index.js donde importes todas las rutas de tus entidades y las agrupes en una única función. Luego, en server.js, simplemente llamá a esa función para registrar todas las rutas en tu app.

---------------------------------------------------------------------------------------------------------------------------------------------------

Trabajo Práctico Nº10
Temas: Prisma ORM

Consigna En base al trabajo práctico N°9:

Instalar prisma en su proyecto
Configurarlo en base a la guia propuesta en https://pdi-website.vercel.app/lessons/prisma_orm
Modificar los endpoints de la entidad que hayan elegido para que se comporten de la siguiente forma:
GET /entidad => Devuelve todos los registros de la entidad que haya en la DB

GET /entidad/:id => Toma una id de los parámetros de la url y devuelve un solo registro de la entidad

POST /entidad => Toma parametros del cuerpo (body) de la solicitud y crea un registro de la entidad en la DB

PUT /entidad/:id => Toma una id de los parámetros de la url y usa los parámetros del cuerpo de la solicitud para modificar un registro

DELETE /entidad/:id => Borra la entidad que contenga la id dada por parámetro de url

Bonus track:

Investigar como usar try {…} catch (e) { … } para manejar excepciones de forma que la app no se rompa cuando recibe algo inesperado
Agregar un query param en el endpoint GET /entidad que aplique algun filtro
