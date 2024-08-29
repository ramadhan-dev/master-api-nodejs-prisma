const zod = require('zod')


exports.create = zod.object({
    body: zod.object({
        date: zod.preprocess((arg) => {
            if (typeof arg === 'string') {
                return new Date(arg);
            }
        }, zod.date().refine((date) => !isNaN(date.getTime()), {
            message: 'Invalid date format',
        })), 
        shiftId: zod.number(),  
        userId: zod.number(), 
    }),
})


exports.update = zod.object({
    body: zod.object({
        date: zod.preprocess((arg) => {
            if (typeof arg === 'string') {
                return new Date(arg);
            }
        }, zod.date().refine((date) => !isNaN(date.getTime()), {
            message: 'Invalid date format',
        })),
        shiftId: zod.number(),
    }),
})

