const zod = require('zod')


exports.create = zod.object({
    body: zod.object({
        name: zod
            .string(),  
        startTime: zod.preprocess((arg) => {
            if (typeof arg === 'string') {
                return new Date(arg);
            }
        }, zod.date().refine((date) => !isNaN(date.getTime()), {
            message: 'Invalid startTime format',
        })),  
        endTime: zod.preprocess((arg) => {
            if (typeof arg === 'string') {
                return new Date(arg);
            }
        }, zod.date().refine((date) => !isNaN(date.getTime()), {
            message: 'Invalid endTime format',
        })), 
    }),
})

