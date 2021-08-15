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

});

module.exports = {
    userSchema,
    addressSchema,
    updateUserSchema,
};