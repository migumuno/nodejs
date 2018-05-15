// cargar librería http
const http = require('http'); // mejor const o let porque ocupan menos memoria y es una variable que no va a cambiar.

// definir un servidor
const server = http.createServer( function(request, response){
    // en cada petición se ejecuta esto:
    response.writeHead( 200, {'Content-Type': 'text/html'} );
    response.end( 'Wake up!' );
} );

// arrancar el servidor
server.listen( 1337, '127.0.0.1' );
console.log( 'Servidor arrancado en http://mike.com:1337' );