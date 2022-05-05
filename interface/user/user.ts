export default interface iuser{
    name: string;
    age:number;
    process:string;
}

export default interface irequest{
    user : iuser;
    type: string;
}

// const Joi = require('joi');


// const schema = Joi.object({
//     name: Joi.string()
//         .min(3)
//         .max(30)
//         .required(),

//     age: Joi.string()
//         .min(3)
//         .max(30)
//         .required(),
//     process: Joi.string()
//         .min(3)
//         .max(30)
//         .required(),

// })



// schema.validate({ name: 'abc', age: '01', process:'abc' });


// schema.validate({});


// try {
//     const value = await schema.validateAsync({ name: 'abc', age: '012', process:'abc' });
// }
// catch (err) { }