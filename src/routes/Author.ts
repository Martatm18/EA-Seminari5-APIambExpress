import express from 'express';
import controller from '../controllers/Author';
import { Schemas, ValidateId, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.post('/', ValidateJoi(Schemas.author.create), controller.createAuthor);
router.get('/:authorId', ValidateId('authorId'), controller.readAuthor);
router.get('/', controller.readAll);
router.put('/:authorId', ValidateId('authorId'), ValidateJoi(Schemas.author.update), controller.updateAuthor);
router.delete('/:authorId', ValidateId('authorId'), controller.deleteAuthor);

export = router;
