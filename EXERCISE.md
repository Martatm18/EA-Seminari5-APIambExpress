# Ejercicio: gestionar los tags de un libro

Cada libro tiene una lista de `tags` (`ciencia-ficcion`, `fantasia`, `novela`, `ensayo`, `poesia`,
`historia`). Hoy la única forma de cambiarlos es reemplazar el libro entero con
`PUT /books/:bookId`, enviando todos sus campos. La idea de este ejercicio es tratar los tags como
un recurso propio dentro del libro.

## Qué hay que construir

| Método | URL | Qué hace | Body |
|---|---|---|---|
| POST | `/books/:bookId/tags` | Añade un tag al libro | `{ "tag": "fantasia" }` |
| PUT | `/books/:bookId/tags` | Reemplaza la lista entera de tags | `{ "tags": ["novela", "historia"] }` |
| DELETE | `/books/:bookId/tags/:tag` | Quita un tag del libro | |

Las tres respuestas devuelven el libro actualizado, con sus autores incluidos.

## Reglas

- El id de la URL se valida con la guarda que ya existe (`ValidateId`), que responde 400 si no tiene
  forma de id de MongoDB.
- El body se valida con Joi antes de llegar al controller. Solo se aceptan los tags de la lista
  `BOOK_TAGS` de `src/models/Book.ts`; cualquier otro valor responde 422.
- Añadir un tag que el libro ya tiene no debe duplicarlo: repetir la petición deja el libro igual.
- Quitar un tag que el libro no tiene no debe dar error.
- Cada capa hace su parte: la ruta declara el endpoint y encadena las guardas, el controller lee la
  petición y responde, y el service es el único que habla con Mongoose.

## Criterios de aceptación

Con un libro que empieza con `tags: ["novela"]`:

| Petición | Respuesta esperada |
|---|---|
| `POST /books/:id/tags` con `{"tag":"fantasia"}` | 200 y `tags: ["novela","fantasia"]` |
| La misma petición otra vez | 200 y `tags: ["novela","fantasia"]` (sin duplicar) |
| `POST /books/:id/tags` con `{"tag":"cocina"}` | 422 |
| `PUT /books/:id/tags` con `{"tags":["ensayo","historia"]}` | 200 y esa lista exacta |
| `DELETE /books/:id/tags/historia` | 200 y `tags: ["ensayo"]` |
| La misma petición otra vez | 200 y `tags: ["ensayo"]` |
| Cualquiera de las tres con un id que no existe | 404 |
| Cualquiera de las tres con `abc` como id | 400 |

## Pistas

- MongoDB tiene dos operadores que hacen justo lo que se pide con una lista: `$addToSet` añade solo
  si no estaba, y `$pull` quita un valor.
- Se usan dentro de `Book.findByIdAndUpdate(...)`, igual que en el resto del service.
- Para que la respuesta traiga el libro ya actualizado: `{ returnDocument: 'after' }`.
- Para que salgan los datos de los autores y no solo sus ids: `.populate('authors')`.
- En Joi, `Joi.string().valid(...BOOK_TAGS)` acepta solo los valores de la lista.

## Cómo probarlo

Con la API arrancada (`npm run dev`) y datos de ejemplo (`npm run seed`):

```
curl -s http://localhost:1337/books | head
curl -X POST http://localhost:1337/books/<id>/tags -H "Content-Type: application/json" -d '{"tag":"fantasia"}'
curl -X DELETE http://localhost:1337/books/<id>/tags/fantasia
```

## Qué no hay que tocar

El campo `tags` ya existe en el modelo, con su lista de valores permitidos. No hace falta cambiar
los modelos, el seed ni el CORS.

## Entrega

Una rama propia a partir de `develop`, un pull request y una línea en el apartado "Hecho" de
[CONTRIBUTING.md](CONTRIBUTING.md).
