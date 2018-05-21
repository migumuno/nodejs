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