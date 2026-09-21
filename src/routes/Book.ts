import express from 'express';
import controller from '../controllers/Book';
import { Schemas, ValidateId, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.post('/', ValidateJoi(Schemas.book.create), controller.createBook);
router.get('/:bookId', ValidateId('bookId'), controller.readBook);
router.get('/', controller.readAll);
router.patch('/:bookId', ValidateId('bookId'), ValidateJoi(Schemas.book.update), controller.updateBook);
router.delete('/:bookId', ValidateId('bookId'), controller.deleteBook);

export = router;
