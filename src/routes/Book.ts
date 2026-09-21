import express from 'express';
import controller from '../controllers/Book';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.post('/', ValidateJoi(Schemas.book.create), controller.createBook);
router.get('/:bookId', controller.readBook);
router.get('/', controller.readAll);
router.patch('/:bookId', ValidateJoi(Schemas.book.update), controller.updateBook);
router.delete('/:bookId', controller.deleteBook);

export = router;
