import express from 'express';
import controller from '../controllers/Book';
import { Schemas, ValidateId, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

/**
 * @openapi
 * /books:
 *   post:
 *     tags: [Books]
 *     summary: Crea un libro
 *     description: Un libro necesita al menos un autor, y cada autor se indica con su id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/BookInput' }
 *     responses:
 *       201:
 *         description: Libro creado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Book' }
 *       409: { $ref: '#/components/responses/Conflict' }
 *       422: { $ref: '#/components/responses/Unprocessable' }
 *       500: { $ref: '#/components/responses/ServerError' }
 */
router.post('/', ValidateJoi(Schemas.book.create), controller.createBook);

/**
 * @openapi
 * /books/{bookId}:
 *   get:
 *     tags: [Books]
 *     summary: Devuelve un libro, con los datos de sus autores
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema: { type: string, pattern: '^[0-9a-fA-F]{24}$' }
 *         example: 6ab2d1c247a7d5e4fe530049
 *     responses:
 *       200: { $ref: '#/components/responses/BookOne' }
 *       400: { $ref: '#/components/responses/BadRequest' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get('/:bookId', ValidateId('bookId'), controller.readBook);

/**
 * @openapi
 * /books:
 *   get:
 *     tags: [Books]
 *     summary: Lista todos los libros, con los datos de sus autores
 *     responses:
 *       200: { $ref: '#/components/responses/BookList' }
 *       500: { $ref: '#/components/responses/ServerError' }
 */
router.get('/', controller.readAll);

/**
 * @openapi
 * /books/{bookId}:
 *   put:
 *     tags: [Books]
 *     summary: Reemplaza los datos de un libro
 *     description: Hay que enviar el libro entero, no solo los campos que cambian.
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema: { type: string, pattern: '^[0-9a-fA-F]{24}$' }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/BookInput' }
 *     responses:
 *       200: { $ref: '#/components/responses/BookOne' }
 *       400: { $ref: '#/components/responses/BadRequest' }
 *       404: { $ref: '#/components/responses/NotFound' }
 *       409: { $ref: '#/components/responses/Conflict' }
 *       422: { $ref: '#/components/responses/Unprocessable' }
 */
router.put('/:bookId', ValidateId('bookId'), ValidateJoi(Schemas.book.update), controller.updateBook);

/**
 * @openapi
 * /books/{bookId}:
 *   delete:
 *     tags: [Books]
 *     summary: Borra un libro
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema: { type: string, pattern: '^[0-9a-fA-F]{24}$' }
 *     responses:
 *       204: { description: Libro borrado, sin contenido }
 *       400: { $ref: '#/components/responses/BadRequest' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.delete('/:bookId', ValidateId('bookId'), controller.deleteBook);

//Tags de un libro

/**
 * @openapi
 * /books/{bookId}/tags:
 *   post:
 *     tags: [Books]
 *     summary: Añade un tag al libro
 *     description: Si el libro ya tiene ese tag, no se duplica. Repetir la petición deja el libro igual.
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema: { type: string, pattern: '^[0-9a-fA-F]{24}$' }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tag: { type: string, enum: [ciencia-ficcion, fantasia, novela, ensayo, poesia, historia] }
 *           example: { tag: fantasia }
 *     responses:
 *       200: { $ref: '#/components/responses/BookOne' }
 *       400: { $ref: '#/components/responses/BadRequest' }
 *       404: { $ref: '#/components/responses/NotFound' }
 *       422: { $ref: '#/components/responses/Unprocessable' }
 */
router.post('/:bookId/tags', ValidateId('bookId'), ValidateJoi(Schemas.book.addTag), controller.addTag);

/**
 * @openapi
 * /books/{bookId}/tags:
 *   put:
 *     tags: [Books]
 *     summary: Reemplaza la lista de tags del libro
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema: { type: string, pattern: '^[0-9a-fA-F]{24}$' }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tags:
 *                 type: array
 *                 items: { type: string, enum: [ciencia-ficcion, fantasia, novela, ensayo, poesia, historia] }
 *           example: { tags: [novela, historia] }
 *     responses:
 *       200: { $ref: '#/components/responses/BookOne' }
 *       400: { $ref: '#/components/responses/BadRequest' }
 *       404: { $ref: '#/components/responses/NotFound' }
 *       422: { $ref: '#/components/responses/Unprocessable' }
 */
router.put('/:bookId/tags', ValidateId('bookId'), ValidateJoi(Schemas.book.replaceTags), controller.replaceTags);

/**
 * @openapi
 * /books/{bookId}/tags/{tag}:
 *   delete:
 *     tags: [Books]
 *     summary: Quita un tag del libro
 *     description: Si el libro no tiene ese tag, no pasa nada y el libro se devuelve igual.
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema: { type: string, pattern: '^[0-9a-fA-F]{24}$' }
 *       - in: path
 *         name: tag
 *         required: true
 *         schema: { type: string, enum: [ciencia-ficcion, fantasia, novela, ensayo, poesia, historia] }
 *         example: fantasia
 *     responses:
 *       200: { $ref: '#/components/responses/BookOne' }
 *       400: { $ref: '#/components/responses/BadRequest' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.delete('/:bookId/tags/:tag', ValidateId('bookId'), controller.removeTag);

export = router;
