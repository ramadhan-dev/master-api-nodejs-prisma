const zod = require('zod')


exports.create = zod.object({
    body: zod.object({
        lat: zod.string(),
        type: zod.string(),
        lng: zod.string(),
        date: zod.preprocess((arg) => {
            if (typeof arg === 'string') {
                return new Date(arg);
            }
        }, zod.date().refine((date) => !isNaN(date.getTime()), {
            message: 'Invalid datetime format',
        })),  
        userId: zod.number(), 
    }),
})

