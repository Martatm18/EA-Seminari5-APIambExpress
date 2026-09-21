import { NextFunction, Request, Response } from 'express';
import BookService from '../services/BookService';

const createBook = (req: Request, res: Response, next: NextFunction) => {
    const { author, title } = req.body;

    return BookService.createBook(author, title)
    .then((book) => res.status(201).json({ book }))
    .catch((error) => res.status(500).json({ error }));
};

const readBook = (req: Request, res: Response, next: NextFunction) => {
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

const updateBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return BookService.updateBook(bookId, req.body)
        .then((book) =>
        book
            ? res.status(200).json({ book })
            : res.status(404).json({ message: 'not found' })
    )
    .catch((error) => res.status(500).json({ error }));
};

const deleteBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return BookService.deleteBook(bookId)
        .then((book) =>
            book
                ? res.status(204).send()
                : res.status(404).json({ message: 'not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default { createBook, readBook, readAll, updateBook, deleteBook };
