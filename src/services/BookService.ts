import Book, { IBook } from '../models/Book';

//Crea un libro en la base de datos
export const createBook = (data: IBook) => {
    const book = new Book(data);

    return book.save();
};

//Busca un libro por su ID en la base de datos
export const getBookById = (bookId: string) => {
    return Book.findById(bookId).populate('authors');
};

//Busca todos los libros en la base de datos
export const getAllBooks = () => {
    return Book.find().populate('authors');
};

//Actualiza un libro en la base de datos
export const updateBook = (bookId: string, data: IBook) => {
    return Book.findByIdAndUpdate(bookId, data, { returnDocument: 'after' }).populate('authors');
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