import { NextFunction, Request, Response } from 'express';
import BookService from '../services/BookService';

const createBook = (req: Request, res: Response, next: NextFunction) => {
    return BookService.createBook(req.body)
        .then((book) => res.status(201).json({ book }))
        .catch((error) => res.status(500).json({ error }));
};

const readBook = (req: Request<{ bookId: string }>, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return BookService.getBookById(bookId)
        .then((book) =>
        book
            ? res.status(200).json({ book })
            : res.status(404).json({ message: 'not found' })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return BookService.getAllBooks()
        .then((books) => res.status(200).json({ books }))
        .catch((error) => res.status(500).json({ error }));
};

const updateBook = (req: Request<{ bookId: string }>, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return BookService.updateBook(bookId, req.body)
        .then((book) =>
        book
            ? res.status(200).json({ book })
            : res.status(404).json({ message: 'not found' })
    )
    .catch((error) => res.status(500).json({ error }));
};

const deleteBook = (req: Request<{ bookId: string }>, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return BookService.deleteBook(bookId)
        .then((book) =>
            book
                ? res.status(204).send()
                : res.status(404).json({ message: 'not found' })
        )
        .catch((error) => res.status(500).json({ error }));
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
