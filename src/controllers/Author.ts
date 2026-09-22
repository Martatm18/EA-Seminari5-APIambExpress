import { NextFunction, Request, Response } from 'express';
import AuthorService from '../services/AuthorService';

const createAuthor = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

return AuthorService.createAuthor(name)
    .then((author) => res.status(201).json({ author }))
    .catch((error) => res.status(500).json({ error }));
};

const readAuthor = (req: Request<{ authorId: string }>, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return AuthorService.getAuthorById(authorId)
        .then((author) =>
        author
            ? res.status(200).json({ author })
            : res.status(404).json({ message: 'not found' })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return AuthorService.getAllAuthors()
        .then((authors) => res.status(200).json({ authors }))
        .catch((error) => res.status(500).json({ error }));
};

const updateAuthor = (req: Request<{ authorId: string }>, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return AuthorService.updateAuthor(authorId, req.body)
        .then((author) =>
        author
            ? res.status(200).json({ author })
            : res.status(404).json({ message: 'not found' })
    )
    .catch((error) => res.status(500).json({ error }));
};

const deleteAuthor = (req: Request<{ authorId: string }>, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return AuthorService.deleteAuthor(authorId)
        .then((author) =>
            author
                ? res.status(204).send()
                : res.status(404).json({ message: 'not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default { createAuthor, readAuthor, readAll, updateAuthor, deleteAuthor };
