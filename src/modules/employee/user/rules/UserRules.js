const zod = require('zod')


exports.create = zod.object({
    body: zod.object({
        password: zod
            .string()
            .min(5),
        name: zod
            .string()
            .min(3),
        email: zod
            .string()
            .email(),
        tenant_code: zod
            .string(),
        company_code: zod
            .string(),
        division_code: zod
            .string()
            

    }),
})




exports.update = zod.object({
    body: zod.object({
        name: zod
            .string()
            .min(3),
        email: zod
            .string()
            .email(),
        tenant_code: zod
            .string(),
        company_code: zod
            .string(),
        division_code: zod
            .string()


    }),
})

