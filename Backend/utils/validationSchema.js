const joi = require("joi");
const User = require("../models/Admin");

const userValidationScehma = joi.object({
    username: joi.string().min(3),
    email: joi.string().email().required(),
    password: joi.string().required(),
    role: joi.string().default("user"),
});

const productValidationSchema = joi.object({
    userid: joi.string(),
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string().required(),
    category: joi.string().required(),
});

const updateProductValidationSchema = joi.object({
    userid: joi.string(),
    name: joi.string(),
    price: joi.number(),
    description: joi.string(),
    category: joi.string(),
});

module.exports = {
    userValidationScehma,
    productValidationSchema,
    CartValidationSchema,
    OrderValidationSchema,
    ReviewValidationSchema,
    updateProductValidationSchema,
};
