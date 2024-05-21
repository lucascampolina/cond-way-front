import { z } from 'zod';

export const registrationSchema = z.object({
    firstName: z.string().min(1, 'Nome é obrigatório'),
    lastName: z.string().min(1, 'Sobrenome é obrigatório'),
    email: z.string().email('Email deve ser um email válido'),
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
    passwordConfirmation: z.string().min(8, 'A confirmação da senha deve ter pelo menos 8 caracteres'),
});

export const loginSchema = z.object({
    email: z.string().email('Email deve ser um email válido'),
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
});
