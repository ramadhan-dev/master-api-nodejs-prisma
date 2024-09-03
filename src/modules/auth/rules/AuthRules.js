const zod = require('zod')


exports.create = zod.object({
    body: zod.object({
        password: zod
            .string(),
        email: zod
            .string()
            .email(),
    }),
})




