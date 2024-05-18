import { z } from 'zod';

export const registrationSchema = z.object({
    firstName: z.string().min(1, 'First Name is required'),
    lastName: z.string().min(1, 'Last Name is required'),
    email: z.string().email('Email must be a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    passwordConfirmation: z.string().min(8, 'Password Confirmation must be at least 8 characters'),
});