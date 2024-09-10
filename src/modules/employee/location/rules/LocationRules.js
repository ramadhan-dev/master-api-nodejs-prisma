const zod = require('zod')


exports.create = zod.object({
    body: zod.object({
        lat: zod
            .string(),
        lng: zod
            .string(),
        name: zod
            .string(),  
        userId: zod
            .number(), 
    }),
})

