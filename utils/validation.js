const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(1)
        .max(50)
        .required(),

    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net']
            }
        })
        .required(),

    password: Joi.string()
        .min(8)
        .max(64)
        .required(),
});

const updateUserSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(1)
        .max(50),

    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net']
            }
        }),

    password: Joi.string()
        .min(8)
        .max(64),
});

const addressSchema = Joi.object({
    state: Joi.string()
        .case('upper')
        .min(2)
        .max(2)
        .required(),
    city: Joi.string()
        .max(30)
        .required(),
    street: Joi.string()
        .max(50)
        .required(),
    number: Joi.number()
        .integer()
        .required(),
    value: Joi.number()
        .integer()
        .required(),
    ownerId: Joi.number()
        .integer()
        .required(),
});

const updateAddressSchema = Joi.object({
    state: Joi.string()
        .case('upper')
        .min(2)
        .max(2),
    city: Joi.string()
        .max(30),
    street: Joi.string()
        .max(50),
    number: Joi.number()
        .integer(),
    value: Joi.number()
        .integer(),
});

module.exports = {
    userSchema,
    addressSchema,
    updateUserSchema,
    updateAddressSchema
};