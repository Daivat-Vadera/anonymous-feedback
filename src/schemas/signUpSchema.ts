import { use } from "react";
import {z} from "zod";

export const userNameValidation = z
    .string()
    .min(3, {message: "Username must be at least 3 characters"})
    .max(20, {message: "Username must be at most 20 characters"})
    .regex(/^[a-zA-Z0-9]+$/, {message: "Username must be alphanumeric"});

export const signUpSchema= z.object({
    username: userNameValidation,
    email: z.string().email({message: "Invalid email"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"}),
});
