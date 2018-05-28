# MongoDB
Es una base de datos no relacional sin esquemas:
- No se puede hacer JOIN.
- Cada registro podría tener una estructura distinta.
- Mínimo soporte a transacciones.

Por estos motivos, MongoDB puede tener mejor rendimiento para algunas tareas.

Consultar las diapostivas para ver los comandos más usados.

## Instalar motor de base de datos MongoDB
Nos descargamos la versión Community Server en mongodb.com. Una vez descargada y descomprimida, accedemos desde terminal a la carpeta carpeta descomprimida y creamos una carpeta (data) y dentro una carpeta db donde guardar la base de datos. Una vez hecho esto ejecutamos el siguiente comando estando en la raíz de la carpeta descomprimida:

*./bin/mongod --dbpath ./data/db --directoryperdb*

La última línea nos indica el puerto donde está esperando la conexión la base de datos (27017). Recomiendo crear un script para ejecutar directamente ese comando sin tener que recordarlo.

Ahora podemos arrancar el manager por terminal desde la carpeta descomprimida de MongoDB:

*./bin/mongo*

### Managers gráficos
Para hacer las gestiones en la base de datos pero de forma gráfica.
- Robomong (Robo3t)
- MongoDB Compass

## Instrucciones
- show dbs: muestra las bases de datos
- use nombre_base_datos: selecciona la base de datos a usar
- show collections: muestra las colecciones existentes
- db.nombre_collection.find(): muestra todos los resultados que hay creados
- db.nombre_collection.find().pretty(): muestra todos los resultados que hay creados de una forma más visual
- db.nombre_collection.insert({}): inserta un nuevo registro con los datos pasados en el objeto. Pueden ser cualquier tipo de datos los del objeto, strings, arrays, otros objetos.
- db.nombre_collection.remove({ _id: ObjectId("5b02a6b5b6a2ec5aeb129b1f") }): borra el elemento con el id indicado
- db.nombre_collection.update({ _id: ObjectId("5b02a6a4b6a2ec5aeb129b1e") }, { $set: {age: 23} }): actualiza el elemento indicado. **OJO! Hay que poner $set para que mantenga el resto de información y no la machaque.**
- db.nombre_collection.drop(): borra toda la colección
- db.nombre_collection.createIndex( {name:1, age:-1} ): crea un índice con el nombre ascendente y la edad descendente. Es fundamental crear un índice para cada filtro que se quiera usar.
- db.nombre_collection.getIndexes(): te dice los índices que hay.
- db.nombre_collection.find( { name: 'Smith' } ): nombre sea Smith
- db.nombre_collection.find( { age: { $gt: 30, $lt: 40 } } ): edad mayor que y menor que
- db.nombre_collection.find( { age: { $in: [ 20, 30, 40 ] } } ): edad sea uno de los valores indicados
- db.nombre_collection.find( { name: 'Smith', $or: [ { age: { $lt: 30 } }, { age: { $gt: 40 } } ] } ): nombre Smith y edad menor a 30 o edad mayor que 40
- db.nombre_collection.find( { name.surname: 'Mechump' } ): se busca como un objeto
- db.nombre_collection.find( { phoneNumbers: 5 } ): busca el número aunque sea un array
- db.nombre_collection.find( { phoneNumbers.0: 5 } ): busca el número aunque sea un array en la primera posición
- db.nombre_collection.find( { phoneNumbers: [ 5, 6, 7 ] } ): busca ese array concreto
- db.nombre_collection.find().sort( {age: -1} ): ordena la búsqueda por la edad descendente
- db.nombre_collection.find().skip(1).limit(1): se salta el primero y solo devuelve 1
- db.nombre_collection.findOne( {name: 'Smith'} ): devuelve solo 1 resultado, es li mismo que limit(1). find() devuelve siempre un array, findOne() devuelve el objeto.
- db.nombre_collection.find().count(): cuenta los resultados

**MongoDB Geo permite hacer búsquedas geoespaciales** Ver diapos.

Permite operaciones atómicas, por ejemplo, busca algo y si lo encuentra lo modifica.
db.nombre_collection.findAndModify({
    query: { name: "Brown" }, // Búsqueda
    update: { $inc: { age: 1 } } // Incrementa en 1 la propiedad age
})

**docs.mongodb.org/manual**
**mongodb university**

## Mongoose
Es un ODM (Object Document Mapper). Permite tener esquemas como MySQL por si se quisiera tener esquemas en algo concreto. Fuerza al desarrollador a mantener los esquemas.ç

npm i mongoose

### Conectando con Express
1. Lo primero es crear la conexión que la he añadido en la carpeta lib > connectMongoose.js
2. Hay que crear el modelo para lo que he creado la carpeta models y el archivo Agente.js
3. Hay que incluir la conexión y el modelo en el archivo app.js
4. Ya se puede crear el enrutamiento dentro de la carpeta routes. Al ser una API es recomendable crear una carpeta.
5. También hay que añadir en el archivo app.js el enrutamiento, se puede buscar la línea Middlewares de mi api