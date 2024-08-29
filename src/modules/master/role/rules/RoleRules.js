const zod = require('zod')


exports.create = zod.object({
    body: zod.object({
        code: zod
            .string()
            .min(3),
        name: zod
            .string()
            .min(3),
    }),
})

