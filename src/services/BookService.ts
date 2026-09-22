import mongoose from 'mongoose';
import Book from '../models/Book';

//Crea un libro en la base de datos
export const createBook = (author: string, title: string) => {
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        author,
        title
    });

    return book.save();
};

//Busca un libro por su ID en la base de datos
export const getBookById = (bookId: string) => {
    return Book.findById(bookId).populate('author');
};

//Busca todos los libros en la base de datos
export const getAllBooks = () => {
    return Book.find().populate('author');
};

//Actualiza un libro en la base de datos
export const updateBook = (
    bookId: string,
    data: { author: string; title: string }
) => {
    return Book.findByIdAndUpdate(bookId, data, { returnDocument: 'after' }).populate('author');
};

//Elimina un libro de la base de datos
export const deleteBook = (bookId: string) => {
    return Book.findByIdAndDelete(bookId);
};

//Exporta todas las funciones del servicio de libro
export default {
    createBook,
    getBookById,
    getAllBooks,
    updateBook,
    deleteBook
};