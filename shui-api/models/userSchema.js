import Joi from 'joi';

const userSchema = Joi.object({
    username: Joi.string()
        .pattern(/^(?=.*[A-Z])(?=.*[a-z]).*$/, { name: 'username' })
        .min(6)
        .max(30)
        .required()
        .messages({
            'string.empty': 'Användarnamn får inte vara tomt.',
            'string.pattern.name': 'Användarnamn måste innehålla både stora och små bokstäver.',
            'string.min': 'Användarnamn måste vara minst 6 tecken långt.',
            'string.max': 'Användarnamn får vara högst 30 tecken långt.',
            'any.required': 'Användarnamn är obligatoriskt.'
        }),
    
    password: Joi.string()
        .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).*$/, { name: 'password' })
        .min(6)
        .max(30)
        .required()
        .messages({
            'string.empty': 'Lösenord får inte vara tomt.',
            'string.pattern.name': 'Lösenord måste innehålla minst en stor bokstav, en liten bokstav, en siffra och ett specialtecken.',
            'string.min': 'Lösenord måste vara minst 6 tecken långt.',
            'string.max': 'Lösenord får vara högst 30 tecken långt.',
            'any.required': 'Lösenord är obligatoriskt.'
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'E-post får inte vara tomt.',
            'string.email': 'E-post måste vara en giltig e-postadress.',
            'any.required': 'E-post är obligatoriskt.'
        }),
});

export { userSchema };
