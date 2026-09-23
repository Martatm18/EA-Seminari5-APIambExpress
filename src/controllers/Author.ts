import { NextFunction, Request, Response } from 'express';
import AuthorService from '../services/AuthorService';

const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = await AuthorService.createAuthor(req.body);
        res.status(201).json({ author });
    } catch (error) {
        next(error);
    }
};

const readAuthor = async (req: Request<{ authorId: string }>, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    try {
        const author = await AuthorService.getAuthorById(authorId);

        if (author) {
            res.status(200).json({ author });
        } else {
            res.status(404).json({ message: 'not found' });
        }
    } catch (error) {
        next(error);
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authors = await AuthorService.getAllAuthors();
        res.status(200).json({ authors });
    } catch (error) {
        next(error);
    }
};

const updateAuthor = async (req: Request<{ authorId: string }>, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    try {
        const author = await AuthorService.updateAuthor(authorId, req.body);

        if (author) {
            res.status(200).json({ author });
        } else {
            res.status(404).json({ message: 'not found' });
        }
    } catch (error) {
        next(error);
    }
};

const deleteAuthor = async (req: Request<{ authorId: string }>, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    try {
        const author = await AuthorService.deleteAuthor(authorId);

        if (author) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'not found' });
        }
    } catch (error) {
        next(error);
    }
};

export default { createAuthor, readAuthor, readAll, updateAuthor, deleteAuthor };
