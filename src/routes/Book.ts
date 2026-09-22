import express from 'express';
import controller from '../controllers/Book';
import { Schemas, ValidateId, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.post('/', ValidateJoi(Schemas.book.create), controller.createBook);
router.get('/:bookId', ValidateId('bookId'), controller.readBook);
router.get('/', controller.readAll);
router.put('/:bookId', ValidateId('bookId'), ValidateJoi(Schemas.book.update), controller.updateBook);
router.delete('/:bookId', ValidateId('bookId'), controller.deleteBook);

//Tags de un libro
router.post('/:bookId/tags', ValidateId('bookId'), ValidateJoi(Schemas.book.addTag), controller.addTag);
router.put('/:bookId/tags', ValidateId('bookId'), ValidateJoi(Schemas.book.replaceTags), controller.replaceTags);
router.delete('/:bookId/tags/:tag', ValidateId('bookId'), controller.removeTag);

export = router;
