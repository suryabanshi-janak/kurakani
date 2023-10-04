import * as z from 'zod';

export const AuthValidator = z.object({
  email: z.string().email().min(1, {
    message: 'Email is required.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

export type AuthFormData = z.infer<typeof AuthValidator>;
