
## Para instalar Express
Express generator sirve para crear aplicaciones de Express de forma más rápida

*npm i express*
*npm i express-generator -g*

## Para crear un proyecto con Express
Ejecutar el comando *express [modificadores] nombre_proyecto*.
Para ver los diferentes modificadores *express -h*.

Para instalarlo, es necesario entrar en el directorio del proyecto y ejecutar *npm i*.
NO OLVIDAR CREAR EL ARCHIVO .gitignore o usar el modificador --git y añadir la carpeta node_modules.

Para ejecutar el proyecto, ejecutar *npm start*. Se crea un servidor en localhost en el puerto 3000.

El archivo www de la aplicación es el que se encarga de ejecutar el proyecto.

Para cambiar el puerto en el que se arranca el servidor (está configurado en el archivo www), hay que cambiar la variable de entorno del SO ejecutando *PORT=1234 npm start*.

Para añadir una ejecución del proyecto personalizada, hay que editar el archivo package.json añadiendo un nuevo script, ejemplo:
*"dev": "DEBUG=nodeapi:* node ./bin/www"* (no olvidar la coma anterior).
Ya se podría ejecutar *npm run dev* arrancando el proyecto con las condiciones definidas.

Es **importante** instalar la librería cross-env para hacer compatible el código con múltiples sitemas operativos.
*npm i cross-env*

Si se instala la librería la línea quedaría:
*"dev": "cross-env DEBUG=nodeapi:* node ./bin/www"*

## Variables de entorno
Se pueden establecer variables de entorno:
*NODE_ENV=production npm start* Así podemos saber en qué entorno estamos
*DEBUG=nombreApp:\* PORT=3001 NODE_ENV=production npm start*
- log debug activado
- puerto 3001
- variable de entorno production

## Middlewares
Es un handler que se activa ante unas determinadas peticiones o todas, antes de realizar la acción principal de una ruta.
Un router es un grupo de middlewares.
Hay un middleware especial que recibe un parámetro más, el de error y se pasa el primero (err, req, res, next), el resto de middlewares reciben 3 parámetros (req, res, next).
Métodos de rutas:
- GET para pedir datos.
- POST para crear un recurso.
- PUT para actualizar un recurso, es idempotente.
- DELETE para eliminar un recurso.
- ALL recibe todas las peticiones.

El orden es importante.

### Ficheros estáticos
Hay un middleware de ficheros estáticos.
*app.use( express.static( path.join( __dirname, 'public' ) ) );* Se puede ver en app.js. Va a ir a buscar a la carpeta public.
Es recomendable tener en cuenta el orden ya que en una api no se va a usar y se puede poner lo más abajo posible y así no es necesario hacer esa petición cada vez.

### Recibiendo parámetros
- En la ruta /users/5
- Con query string /users?sort=name
- En el cuerpo de la petición (POST y PUT generalmente)
- En la cabecera.

*router.get('/paramopcional/:dato?', (req, res, next) => { // lo que sea })* Poniendo el interrogante se pone opcional

*router.get('/param/:id([0-9]+)', (req, res, next) => { // lo que sea })* Valida que el parámetro es de tipo numérico. Las expresiones regulares requieren mayor rendimiento.

*router.put('/param/:id([0-9]+)/piso/:piso/puerta/:puerta([A|B|C])', (req, res, next) => { // lo que sea })* Múltiples parámetros

Para recoger los parámetros por ruta se usa req.param.
En el caso de los parámetros que se obtienen por query string, se obtienen por req.query y no es necesario poner nada en el middleware.

*router.get('/ruta', (req, res, next) => { console.log( 'req.query', req.query) })* 

Para recoger los parámetros en el cuerpo de la petición (ni GET ni DELETE) usamos req.body. Usar esta forma cuando la URL vaya a ser demasiado larga.

*router.post('/ruta', (req, res, next) => { console.log( 'req.body', req.body) })*

Las peticiones de tipo POST permiten pasar mayor tamaño de parámetros.

### Validaciones
Instalamos una librería para express
 *npm i express-validator*

 NO OLVIDAR CARGAR LA LIBRERÍA DONDE LA VAYAMOS A USAR
 *const { query, validationResult } = require( 'express-validator/check' )*

*router.get('/ruta', [
     query('age')
        .isNumeric().withMessage( 'debería ser un número' ) // se valida un parámetro age.
        .custom( (value) => { // esto es una validación personalizada
            if( value < 18 ) {
                throw new Error( 'debe ser mayor de edad' );
            }
            return true; // es importante devolver true para que no de error.
        } )
 ], (req, res, next) => { 
     validationResult(req).throw(); // esto lanza los mensajes de error, es obligatorio.
     // lo que sea 
})*

ES NECESARIO AÑADIR EN EL ERROR HANDLER (AL PRINCIPIO DEL MIDDLEWARE) DE app.js LO SIGUIENTE PARA QUE SE VEAN LOS ERRORES
*if(err.array) { // validation error
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0]; // muestra solo 1 error, pero se podrían mostrar todos.
    err.message = `Not valid - ${errInfo.param} ${errInfo.msg}`;
}*

### Métodos de respuesta
El cuerpo de la respuesta puede ser un buffer, un string, un objeto o un array. Express detecta el tipo usado y modifica el Content-Type. Si es un array o un objeto devuelve su representación en JSON.

Se puede encadenar el código de error con el send.

*res.status(404).send('Sorry, we cannot find that!');*

- res.send( 'Holi );
- res.json( {user: 'tobi'} );
- res.download( '/report-12345.pdf', 'report.pdf' ); // ruta y nombre (opcional) de descarga.
- res.redirect( '/foo/bar' ); // relativa a la raíz. Por defecto 302
- res.redirect( 301, 'http://...' );
- res.redirect( 'back' ); // vuelve al referer, a la página anterior
- res.render( 'index', {user: 'Tobi'} ); // renderiza la vista index y pasa el parámetro user
- res.sendFile( fileName, options ); // envía un fichero como si fuera un estático, no para descargar. Se pueden ver las opciones en http://expressjs.com/en/4x/api.html#res.sendFile
- res.set( {'Content-Type': 'text/plain'} ); // define las cabeceras para cualquiera de los métodos anteriores.

Se pueden instalar middlewares a través de npm (buscar en expressjs http://expressjs.com/en/resources/middleware.html) y usarlos directamente. Multer está muy bien.

**INTERESANTE** Nodemailer para enviar emails.

## Template engines
Express por defecto monta Jade, pero se puede cambiar fácilmente al instalar inicialmente o cambiando dos líneas en app.js.

*app.set( 'view engine', 'ejs' );*

El listado de todos los disponibles está en https://www.npmjs.com/package/consolidate#supported-template-engines

Para instalar un motor de plantillas se puede hacer con npm sin problemas.

### Pasar variables
- Variables globales: app.locals.title = 'Holi'; // Definir en app.js. Están disponibles para todas las vistas
- Variables locales: res.locals.valor = 32; // Disponible para el middleware donde está definido únicamente.
- Variables locales definidas en el renderizado: res.render( 'index', {valor: 32} );

Para representar el valor con <%= variable %> // si se sustituye el igual por -, no se escapa el código y puede ser ejecutado.

### Funcionamiento
Podemos incluir otras plantillas con:
*<% include otra/plantilla %>*

Se puede escribir código en plantilla:
*<% if ( // lo que sea ) { %>*
    // lo que sea
*<% } %>*

*<%= user.name + ' ' + user.surname %>*

Se puede poner cualquier código válido javascript sin problemas. Intentar poner el mínimo código posible en las vistas.

Se podrían tener las vistas con extensión .html.

*app.set( 'view engine', 'html' );*
*app.engine( 'html', require('ejs').__express );*