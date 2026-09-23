import { ErrorRequestHandler } from 'express';
import Logging from '../library/Logging';

type DatabaseError = Error & { code?: number; status?: number; details?: unknown[] };

export const ErrorHandler: ErrorRequestHandler = (error: DatabaseError, req, res, next) => {
    Logging.error(error);

    if (res.headersSent) {
        return next(error);
    }

    if (error.code === 11000) {
        const duplicatedField = Object.keys((error as DatabaseError & { keyPattern?: Record<string, unknown> }).keyPattern ?? {})[0];

        return res.status(409).json({
            message: `${duplicatedField || 'El valor'} ya existe`
        });
    }

    if (error.details) {
        return res.status(422).json({ message: 'La petición no cumple las reglas de validación' });
    }

    if (error.name === 'ValidationError' || error.name === 'CastError') {
        return res.status(400).json({ message: error.message });
    }

    if (error.name === 'Error' && error.message === 'Not found') {
        return res.status(404).json({ message: error.message });
    }

    const status = error.status && error.status >= 400 && error.status < 500 ? error.status : 500;

    return res.status(status).json({
        message: status === 500 ? 'Internal server error' : error.message
    });
};

export default ErrorHandler;
