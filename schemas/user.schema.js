const Joi = require('joi');


const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const lastName = Joi.string().min(3).max(15);
const email = Joi.string().email();
const password = Joi.string().min(6);
const phone = Joi.string();
const address = Joi.string();
const city = Joi.string();

const getUserSchema = Joi.object({
    id: id.required(),    
});

const createUserSchema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    email: email.required(),
    password: password.required(),
    phone: phone.required(),
    address: address.required(),
    city: city.required(),
}); 

const updateUserSchema = Joi.object({
    name: name,
    lastName: lastName,
    email: email,
    password: password,
    phone: phone,
    address: address,
    city: city,
});


module.exports = { createUserSchema, updateUserSchema, getUserSchema }; 
