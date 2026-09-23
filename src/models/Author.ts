import mongoose, { Document, Schema } from 'mongoose';
import { randomBytes, scrypt } from 'node:crypto';
import { promisify } from 'node:util';
import Logging from '../library/Logging';

const deriveKey = promisify(scrypt);

export interface IAuthor {
    name: string;
    email: string;
    password: string;
    birthDate?: Date;
    nationality?: string;
    biography?: string;
    website?: string;
    photoUrl?: string;
    active?: boolean;
    role?: 'author' | 'admin';
}

export interface IAuthorModel extends IAuthor, Document {}

const AuthorSchema: Schema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        // El email identifica al autor: no puede repetirse
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        // select: false hace que la contraseña no salga nunca en las respuestas.
        // Todavía se guarda tal cual: cifrarla es la tarea del hook pre-save (ver CONTRIBUTING).
        password: { type: String, required: true, select: false },
        birthDate: { type: Date },
        nationality: { type: String, trim: true },
        biography: { type: String, maxlength: 1000 },
        website: { type: String, trim: true },
        photoUrl: { type: String, trim: true },
        active: { type: Boolean, default: true },
        role: { type: String, enum: ['author', 'admin'], default: 'author' }
    },
    {
        timestamps: true,
        versionKey: false,
        // Al convertir el autor a JSON se quita la contraseña, para que no salga
        // nunca en una respuesta (tampoco al crearlo o al actualizarlo)
        toJSON: {
            transform: (document, result: Record<string, unknown>) => {
                delete result.password;
                return result;
            }
        }
    }
);

AuthorSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const salt = randomBytes(16).toString('hex');
    const derivedKey = (await deriveKey(String(this.password), salt, 64)) as Buffer;
    this.password = `scrypt:${salt}:${derivedKey.toString('hex')}`;
});

AuthorSchema.post('save', function (author) {
    Logging.info(`Email simulation: welcome email sent to ${author.email}`);
});

export default mongoose.model<IAuthorModel>('Author', AuthorSchema);
