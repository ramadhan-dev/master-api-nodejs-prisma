const zod = require('zod')


exports.create = zod.object({
    body: zod.object({
        EmployeeCode: zod
            .string()
            .min(3),
        FirstName: zod
            .string()
            .min(3),
        Email: zod
            .string()
            .email(),
        PhoneNumber: zod
            .string()
            .regex(/^\+?[0-9]{10,15}$/, "The phone number must consist of 10-15 digits."),

    }),
})

