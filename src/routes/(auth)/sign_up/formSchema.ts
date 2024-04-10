import { z } from "zod";

export const formSchema = z.object({
    full_name: z.string().max(50).trim().refine(fullName => fullName.length >= 2, {
        message: "Full name requires 2 characters minimum.",
    }),
    email: z.string().email(),
    password: z.string().max(50).trim().refine(password =>
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[!@#$%^&*(),.?":{}|<>]/.test(password),
        {
            message: "Password requires 8 characters minimum, a capital, a small letter and a special character.",
        },
    ),
})

export type FormSchema = typeof formSchema;
