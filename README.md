# Seminari 5: API REST con Node.js, Express, TypeScript y MongoDB

API REST de ejemplo con dos recursos, **autores** y **libros**, organizada en capas
(rutas, middleware, controllers, services y models). Es la base sobre la que el equipo
trabaja los objetivos del Seminario 5 de EA:

- Estructura del proyecto
- Middleware: CORS, entrada (validación o logger) y salida (gestor de errores)
- Documentación con Swagger
- Linter

Qué está hecho y qué queda por hacer: [CONTRIBUTING.md](CONTRIBUTING.md).

## Tecnologías

| Tecnología | Versión | Para qué se usa |
|---|---|---|
| [Node.js](https://nodejs.org/) | 14.x o superior | Ejecuta JavaScript fuera del navegador: es el servidor |
| [TypeScript](https://www.typescriptlang.org/) | 4.5 | JavaScript con tipos. Se compila a JavaScript en `build/` |
| [Express](https://expressjs.com/) | 4.17 | Recibe las peticiones HTTP y las reparte por rutas y middleware |
| [MongoDB](https://www.mongodb.com/) | local o Atlas | Base de datos que guarda documentos |
| [Mongoose](https://mongoosejs.com/) | 6.2 | Define la forma de los datos (esquemas) y habla con MongoDB |
| [Joi](https://joi.dev/) | 17.6 | Comprueba que el body de una petición es correcto |
| [dotenv](https://github.com/motdotla/dotenv) | 16.0 | Carga las variables del archivo `.env` en `process.env` |
| [chalk](https://github.com/chalk/chalk) | 4.1 | Pone colores a los mensajes de la consola |
| [Prettier](https://prettier.io/) | extensión de VS Code | Da formato al código al guardar (reglas en `.prettierrc`) |

## Requisitos previos

- [Node.js](https://nodejs.org/) (versión 14.x o superior). Incluye [npm](https://www.npmjs.com/).
- [MongoDB](https://www.mongodb.com/): una instancia local o un cluster en MongoDB Atlas.
- [VS Code](https://code.visualstudio.com/) con la extensión Prettier (recomendado).

TypeScript no hace falta instalarlo aparte: viene con las dependencias del proyecto.

## Clonar el proyecto

```
git clone https://github.com/Martatm18/EA-Seminari5-APIambExpress
cd EA-Seminari5-APIambExpress
```

## Instalar las dependencias

```
npm install
```

Al terminar, `npm install` también compila el proyecto una vez.

## Configurar las variables de entorno

Cada miembro del equipo tiene su propio `.env`, que **no se sube a git**. Se crea copiando la plantilla:

```
cp .env.example .env
```

| Variable | Qué es | Valor por defecto |
|---|---|---|
| `MONGO_URL` | Dirección de tu MongoDB | `mongodb://127.0.0.1:27017/seminari5` |
| `SERVER_PORT` | Puerto en el que escucha la API | `1337` |

## Compilar y ejecutar

Compilar de TypeScript a JavaScript (genera `build/`):
```
npm run build
```

Arrancar la API:
```
npm start
```

Para comprobar que responde, abre http://localhost:1337/ping en el navegador. Debe devolver `{"hello":"world"}`.

Si cambias el código, vuelve a ejecutar `npm run build` antes de `npm start`.

## Estructura del proyecto

```
src/
  server.ts        Punto de entrada: conecta con MongoDB, registra el middleware y las rutas, y arranca el servidor
  config/          Lee las variables de entorno y las reúne en un objeto config
  library/         Utilidades compartidas
    Logging.ts       Mensajes de consola con fecha y color (info, warning, error)
  routes/          El mapa de URLs: qué petición va a qué controller
    Author.ts, Book.ts
  middleware/      Lo que se ejecuta entre la ruta y el controller
    Joi.ts           Guardas: validan el body (422) y el id de la URL (400)
  controllers/     Leen la petición (req), llaman al service y eligen la respuesta (res)
    Author.ts, Book.ts
  services/        Leen y escriben en la base de datos a través de los models. No saben que existe HTTP
    AuthorService.ts, BookService.ts
  models/          Esquemas de Mongoose: qué campos tiene cada documento y de qué tipo
    Author.ts, Book.ts
```

Una petición recorre las capas siempre en el mismo orden:

```
cliente -> server.ts (logger, JSON, CORS) -> routes/ -> middleware/ (validación) -> controllers/ -> services/ -> models/ -> MongoDB
```

Cada capa hace una sola cosa. Por eso los `services/` y los `models/` no importan Express:
si un día se cambiara Express por otro framework, esas dos carpetas no habría que tocarlas.

## Endpoints

| Método | URL | Qué hace | Body |
|---|---|---|---|
| GET | `/ping` | Comprueba que la API está viva | |
| POST | `/authors` | Crea un autor | `{ "name": "..." }` |
| GET | `/authors` | Lista todos los autores | |
| GET | `/authors/:authorId` | Devuelve un autor | |
| PUT | `/authors/:authorId` | Reemplaza los datos de un autor | `{ "name": "..." }` |
| DELETE | `/authors/:authorId` | Borra un autor | |
| POST | `/books` | Crea un libro | `{ "title": "...", "author": "<id de un autor>" }` |
| GET | `/books` | Lista todos los libros, con los datos de su autor | |
| GET | `/books/:bookId` | Devuelve un libro, con los datos de su autor | |
| PUT | `/books/:bookId` | Reemplaza los datos de un libro | `{ "title": "...", "author": "<id de un autor>" }` |
| DELETE | `/books/:bookId` | Borra un libro | |

Ejemplo con curl (también sirve Postman o Thunder Client):

```
curl -X POST http://localhost:1337/authors -H "Content-Type: application/json" -d '{"name":"Ana"}'
```

Códigos de respuesta: 201 al crear, 200 al leer o modificar, 204 al borrar, 400 si el id de la URL
no tiene forma de id de MongoDB, 404 si el id no existe, 422 si el body no es válido y 500 si falla
algo en el servidor.

## Cómo contribuir

Ramas, commits y estado del proyecto en [CONTRIBUTING.md](CONTRIBUTING.md).
