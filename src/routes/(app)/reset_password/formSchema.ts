import { z } from "zod";

export const formSchema = z.object({
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
