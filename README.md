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
| [Node.js](https://nodejs.org/) | 24 LTS (mínimo 22.12) | Ejecuta JavaScript fuera del navegador: es el servidor |
| [TypeScript](https://www.typescriptlang.org/) | 6.0 | JavaScript con tipos. Se compila a JavaScript en `build/` |
| [Express](https://expressjs.com/) | 5.2 | Recibe las peticiones HTTP y las reparte por rutas y middleware |
| [MongoDB](https://www.mongodb.com/) | local o Atlas | Base de datos que guarda documentos |
| [Mongoose](https://mongoosejs.com/) | 9.10 | Define la forma de los datos (esquemas) y habla con MongoDB |
| [Joi](https://joi.dev/) | 18.2 | Comprueba que el body de una petición es correcto |
| [dotenv](https://github.com/motdotla/dotenv) | 17.4 | Carga las variables del archivo `.env` en `process.env` |
| [chalk](https://github.com/chalk/chalk) | 4.1 | Pone colores a los mensajes de la consola |
| [cors](https://github.com/expressjs/cors) | 2.8 | Controla desde qué origen puede llamar un navegador a la API |
| [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) | 5.0 | Muestra la documentación de la API en `/api-docs` |
| [tsx](https://tsx.is/) | 4.23 | Ejecuta TypeScript sin compilar y reinicia la API al guardar (`npm run dev`) |
| [Prettier](https://prettier.io/) | extensión de VS Code | Da formato al código al guardar (reglas en `.prettierrc`) |

## Requisitos previos

- [Node.js](https://nodejs.org/) 24 LTS (mínimo 22.12). Incluye [npm](https://www.npmjs.com/).
  Si usas [nvm](https://github.com/nvm-sh/nvm), `nvm use` elige la versión indicada en `.nvmrc`.
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

## Configurar las variables de entorno

Cada miembro del equipo tiene su propio `.env`, que **no se sube a git**. Se crea copiando la plantilla:

```
cp .env.example .env
```

| Variable | Qué es | Valor por defecto |
|---|---|---|
| `MONGO_URL` | Dirección de tu MongoDB | `mongodb://127.0.0.1:27017/seminari5` |
| `SERVER_PORT` | Puerto en el que escucha la API | `1337` |
| `CORS_ORIGIN` | Desde qué dirección se puede llamar a la API desde un navegador | `*` (cualquiera) |

## Ejecutar

Mientras programas, arranca la API en modo desarrollo. Se reinicia sola cada vez que guardas un archivo:
```
npm run dev
```

Para comprobar que responde, abre http://localhost:1337/ping en el navegador. Debe devolver `{"hello":"world"}`.
La documentación de la API (Swagger) está en http://localhost:1337/api-docs.

Para ejecutar la versión compilada, como se haría en un servidor:
```
npm run build
npm start
```

`npm run build` compila de TypeScript a JavaScript en `build/`. Si cambias el código, vuelve a ejecutarlo antes de `npm start`.

## Datos de ejemplo

Para no empezar con la base de datos vacía, hay 5 autores y 12 libros de ejemplo en `src/seed-data.ts`:

```
npm run seed
```

Este comando solo inserta los datos si la base de datos está vacía. Para borrar los autores y los
libros que haya y volver a crearlos:

```
npm run seed -- --reset
```

Siempre trabaja sobre la base de datos de tu `.env`.

## Estructura del proyecto

```
src/
  server.ts        Punto de entrada: conecta con MongoDB, registra el middleware y las rutas, y arranca el servidor
  seed.ts          Script que llena la base de datos con los datos de ejemplo
  seed-data.ts     Los datos de ejemplo: autores y libros
  config/          Lee las variables de entorno y las reúne en un objeto config
  library/         Utilidades compartidas
    Logging.ts       Mensajes de consola con fecha y color (info, warning, error)
  routes/          El mapa de URLs: qué petición va a qué controller
    Author.ts, Book.ts
  middleware/      Lo que se ejecuta entre la ruta y el controller
    Joi.ts           Guardas: validan el body (422) y el id de la URL (400)
    Cors.ts          Cabeceras de CORS, configuradas con CORS_ORIGIN
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
| POST | `/authors` | Crea un autor | `{ "name": "...", "email": "...", "password": "..." }` |
| GET | `/authors` | Lista todos los autores | |
| GET | `/authors/:authorId` | Devuelve un autor | |
| PUT | `/authors/:authorId` | Reemplaza los datos de un autor | `{ "name": "...", "email": "...", "password": "..." }` |
| DELETE | `/authors/:authorId` | Borra un autor | |
| POST | `/books` | Crea un libro | `{ "title": "...", "authors": ["<id de un autor>"], "isbn": "..." }` |
| GET | `/books` | Lista todos los libros, con los datos de sus autores | |
| GET | `/books/:bookId` | Devuelve un libro, con los datos de sus autores | |
| PUT | `/books/:bookId` | Reemplaza los datos de un libro | `{ "title": "...", "authors": ["<id de un autor>"], "isbn": "..." }` |
| DELETE | `/books/:bookId` | Borra un libro | |

Un autor tiene además estos campos opcionales: `birthDate`, `nationality`, `biography`, `website`,
`photoUrl`, `active` y `role`. La contraseña nunca se devuelve en las respuestas.

Un libro tiene además: `edition`, `publisher`, `publishedYear`, `pages`, `language` (`es`, `ca` o `en`),
`tags` (`ciencia-ficcion`, `fantasia`, `novela`, `ensayo`, `poesia`, `historia`) y `price`.
Un libro puede tener más de un autor, y necesita al menos uno.

Ejemplo con curl (también sirve Postman o Thunder Client):

```
curl -X POST http://localhost:1337/authors -H "Content-Type: application/json" -d '{"name":"Ana"}'
```

Códigos de respuesta: 201 al crear, 200 al leer o modificar, 204 al borrar, 400 si el id de la URL
no tiene forma de id de MongoDB, 404 si el id no existe, 422 si el body no es válido y 500 si falla
algo en el servidor.

## Cómo contribuir

Ramas, commits y estado del proyecto en [CONTRIBUTING.md](CONTRIBUTING.md).
