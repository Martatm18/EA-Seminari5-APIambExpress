import Author, { IAuthor } from '../models/Author';

// Funcion que se encarga de crear un autor en la base de datos
export const createAuthor = (data: IAuthor) => {

    // Creamos un nuevo autor usando los datos que hemos recibido
    const author = new Author(data);

    // Guardamos el autor en la base de datos y devolvemos el resultado
    return author.save();

};

// Funcion que busca un autor por su ID en la base de datos
export const getAuthorById = (authorId: string) => {

    // Buscamos el autor usando el ID que hemos recibido
    return Author.findById(authorId);

};

// Funcion que busca todos los autores de la base de datos
export const getAllAuthors = () => {

    // Devolvemos todos los autores que hay guardados
    return Author.find();

};

// Funcion que se encarga de actualizar un autor
export const updateAuthor = (authorId: string, data: IAuthor) => {

    // Buscamos primero el autor que queremos actualizar
    return Author.findById(authorId).then(async (author) => {

        // Si no existe ningun autor con ese ID devolvemos null
        if (!author) {

            return null;

        }

        // Actualizamos los datos del autor con los nuevos datos recibidos
        Object.assign(author, data);

        // Guardamos los cambios en la base de datos
        return author.save();

    });

};

// Funcion que se encarga de eliminar un autor de la base de datos
export const deleteAuthor = (authorId: string) => {

    // Buscamos el autor por su ID y lo eliminamos
    return Author.findByIdAndDelete(authorId);

};

// Exportamos todas las funciones para poder utilizarlas desde el controlador
export default {

    createAuthor,

    getAuthorById,

    getAllAuthors,

    updateAuthor,

    deleteAuthor

};

