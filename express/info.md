
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