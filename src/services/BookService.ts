import Book, { IBook } from '../models/Book';

// Funcion que se encarga de crear un libro en la base de datos
export const createBook = (data: IBook) => {
    // Creamos un nuevo libro usando los datos que hemos recibido
    const book = new Book(data);

    // Guardamos el libro en la base de datos y devolvemos el resultado
    return book.save();
};

// Funcion que busca un libro por su ID en la base de datos
export const getBookById = (bookId: string) => {
    // Buscamos el libro por su ID y obtenemos tambien los datos de sus autores
    return Book.findById(bookId).populate('authors');
};

// Funcion que busca todos los libros de la base de datos
export const getAllBooks = () => {
    // Buscamos todos los libros y obtenemos tambien los datos de sus autores
    return Book.find().populate('authors');
};

// Funcion que se encarga de actualizar un libro
export const updateBook = (bookId: string, data: IBook) => {
    // Buscamos el libro por su ID y actualizamos sus datos.
    // Con new: true devolvemos el documento actualizado y también poblamos autores.
    return Book.findByIdAndUpdate(bookId, data, { new: true }).populate('authors');
};

// Funcion que se encarga de eliminar un libro de la base de datos
export const deleteBook = (bookId: string) => {
    // Buscamos el libro por su ID y lo eliminamos
    return Book.findByIdAndDelete(bookId);
};

// Exportamos todas las funciones para poder utilizarlas desde el controlador
export default {
    createBook,

    getBookById,

    getAllBooks,

    updateBook,

    deleteBook
};
