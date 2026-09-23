import { NextFunction, Request, Response } from 'express';
import BookService from '../services/BookService';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await BookService.createBook(req.body);
        res.status(201).json({ book });
    } catch (error) {
        next(error);
    }
};

const readBook = async (req: Request<{ bookId: string }>, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    try {
        const book = await BookService.getBookById(bookId);

        if (book) {
            res.status(200).json({ book });
        } else {
            res.status(404).json({ message: 'not found' });
        }
    } catch (error) {
        next(error);
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await BookService.getAllBooks();
        res.status(200).json({ books });
    } catch (error) {
        next(error);
    }
};

const updateBook = async (req: Request<{ bookId: string }>, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    try {
        const book = await BookService.updateBook(bookId, req.body);

        if (book) {
            res.status(200).json({ book });
        } else {
            res.status(404).json({ message: 'not found' });
        }
    } catch (error) {
        next(error);
    }
};

const deleteBook = async (req: Request<{ bookId: string }>, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    try {
        const book = await BookService.deleteBook(bookId);

        if (book) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'not found' });
        }
    } catch (error) {
        next(error);
    }
};

const addTag = (req: Request<{ bookId: string }>, res: Response, next: NextFunction) => {
    const { tag } = req.body;

    return BookService.addTag(req.params.bookId, tag)
        .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const replaceTags = (req: Request<{ bookId: string }>, res: Response, next: NextFunction) => {
    const { tags } = req.body;

    return BookService.replaceTags(req.params.bookId, tags)
        .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const removeTag = (req: Request<{ bookId: string; tag: string }>, res: Response, next: NextFunction) => {
    return BookService.removeTag(req.params.bookId, req.params.tag)
        .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createBook, readBook, readAll, updateBook, deleteBook, addTag, replaceTags, removeTag };
