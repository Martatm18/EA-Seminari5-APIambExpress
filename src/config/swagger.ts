import path from 'node:path';
import swaggerJsdoc from 'swagger-jsdoc';
import j2s from 'joi-to-swagger';
import { Schemas } from '../middleware/Joi';
import { config } from './config';

// La documentación de cada endpoint está escrita en un comentario /** @openapi */
// encima de su ruta, en src/routes/. Aquí solo se montan las piezas comunes.

// Los esquemas del body salen de los mismos esquemas de Joi que validan las
// peticiones, así que no se pueden quedar desfasados.
const { swagger: authorInput } = j2s(Schemas.author.create);
const { swagger: bookInput } = j2s(Schemas.book.create);

// Respuestas de error que comparten casi todas las rutas
const errorResponse = (description: string) => ({
    description,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: { message: { type: 'string' } }
            }
        }
    }
});

const swaggerDocument = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'API de autores y libros del Seminari 5 (Node.js, Express, TypeScript y MongoDB).'
        },
        servers: [{ url: `http://localhost:${config.server.port}` }],
        tags: [
            { name: 'Health', description: 'Comprobar que la API responde' },
            { name: 'Authors', description: 'Autores' },
            { name: 'Books', description: 'Libros' }
        ],
        components: {
            schemas: {
                AuthorInput: authorInput,
                BookInput: bookInput
            },
            responses: {
                BadRequest: errorResponse('El id de la URL no tiene forma de id de MongoDB'),
                NotFound: errorResponse('No existe ningún recurso con ese id'),
                Conflict: errorResponse('Ya existe otro recurso con ese email o ese ISBN'),
                Unprocessable: errorResponse('El body no cumple el esquema'),
                ServerError: errorResponse('Error inesperado del servidor')
            }
        }
    },
    // __dirname es src/config con npm run dev y build/config con npm start:
    // en los dos casos se leen las rutas, porque al compilar se conservan los comentarios
    apis: [path.join(__dirname, '../routes/*.{ts,js}'), path.join(__dirname, '../server.{ts,js}')]
});

export default swaggerDocument;
