import Author, { IAuthor } from '../models/Author';

//Funcion que crea un autor en la base de datos
export const createAuthor = (data: IAuthor) => {
    const author = new Author(data);

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
export const updateAuthor = (authorId: string, data: IAuthor) => {
    return Author.findByIdAndUpdate(authorId, data, { returnDocument: 'after' });
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