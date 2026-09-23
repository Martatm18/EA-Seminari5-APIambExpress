import express from 'express';
import controller from '../controllers/Author';
import { Schemas, ValidateId, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

/**
 * @openapi
 * /authors:
 *   post:
 *     tags: [Authors]
 *     summary: Crea un autor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/AuthorInput' }
 *     responses:
 *       201:
 *         description: Autor creado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Author' }
 *       409: { $ref: '#/components/responses/Conflict' }
 *       422: { $ref: '#/components/responses/Unprocessable' }
 *       500: { $ref: '#/components/responses/ServerError' }
 */
router.post('/', ValidateJoi(Schemas.author.create), controller.createAuthor);

/**
 * @openapi
 * /authors/{authorId}:
 *   get:
 *     tags: [Authors]
 *     summary: Devuelve un autor
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         schema: { type: string, pattern: '^[0-9a-fA-F]{24}$' }
 *         example: 6ab2d1ad9ada2730451295a7
 *     responses:
 *       200: { $ref: '#/components/responses/AuthorOne' }
 *       400: { $ref: '#/components/responses/BadRequest' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get('/:authorId', ValidateId('authorId'), controller.readAuthor);

/**
 * @openapi
 * /authors:
 *   get:
 *     tags: [Authors]
 *     summary: Lista todos los autores
 *     responses:
 *       200: { $ref: '#/components/responses/AuthorList' }
 *       500: { $ref: '#/components/responses/ServerError' }
 */
router.get('/', controller.readAll);

/**
 * @openapi
 * /authors/{authorId}:
 *   put:
 *     tags: [Authors]
 *     summary: Reemplaza los datos de un autor
 *     description: Hay que enviar el autor entero, no solo los campos que cambian.
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         schema: { type: string, pattern: '^[0-9a-fA-F]{24}$' }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/AuthorInput' }
 *     responses:
 *       200: { $ref: '#/components/responses/AuthorOne' }
 *       400: { $ref: '#/components/responses/BadRequest' }
 *       404: { $ref: '#/components/responses/NotFound' }
 *       409: { $ref: '#/components/responses/Conflict' }
 *       422: { $ref: '#/components/responses/Unprocessable' }
 */
router.put('/:authorId', ValidateId('authorId'), ValidateJoi(Schemas.author.update), controller.updateAuthor);

/**
 * @openapi
 * /authors/{authorId}:
 *   delete:
 *     tags: [Authors]
 *     summary: Borra un autor
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         schema: { type: string, pattern: '^[0-9a-fA-F]{24}$' }
 *     responses:
 *       204: { description: Autor borrado, sin contenido }
 *       400: { $ref: '#/components/responses/BadRequest' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.delete('/:authorId', ValidateId('authorId'), controller.deleteAuthor);

export = router;
