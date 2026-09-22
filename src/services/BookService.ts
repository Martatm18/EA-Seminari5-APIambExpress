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

//Anade un tag al libro. $addToSet no lo duplica si ya estaba: repetir la peticion
//deja el libro igual
export const addTag = (bookId: string, tag: string) => {
    return Book.findByIdAndUpdate(bookId, { $addToSet: { tags: tag } }, { returnDocument: 'after' }).populate('authors');
};

//Reemplaza la lista entera de tags del libro
export const replaceTags = (bookId: string, tags: string[]) => {
    return Book.findByIdAndUpdate(bookId, { tags }, { returnDocument: 'after' }).populate('authors');
};

//Quita un tag del libro. $pull no falla si el tag no estaba
export const removeTag = (bookId: string, tag: string) => {
    return Book.findByIdAndUpdate(bookId, { $pull: { tags: tag } }, { returnDocument: 'after' }).populate('authors');
};

//Exporta todas las funciones del servicio de libro
export default {
    createBook,
    getBookById,
    getAllBooks,
    updateBook,
    deleteBook,
    addTag,
    replaceTags,
    removeTag
};