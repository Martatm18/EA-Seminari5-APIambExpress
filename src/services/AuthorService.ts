import mongoose from 'mongoose';
import Author from '../models/Author';

//Funcion que crea un autor en la base de datos
export const createAuthor = (name: string) => {
    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name
    });

    return author.save();
};

//Busca un autor por su ID en la base de datos
export const getAuthorById = (authorId: string) => {
    return Author.findById(authorId);
};

//Busca todos los autores en la base de datos
export const getAllAuthors = () => {
    return Author.find();
};

//Actualiza un autor en la base de datos
export const updateAuthor = (authorId: string, data: { name: string }) => {
    return Author.findByIdAndUpdate(authorId, data, { new: true });
};

//Elimina un autor de la base de datos
export const deleteAuthor = (authorId: string) => {
    return Author.findByIdAndDelete(authorId);
};

//Exporta todas las funciones del servicio de autor
export default {
    createAuthor,
    getAuthorById,
    getAllAuthors,
    updateAuthor,
    deleteAuthor
};