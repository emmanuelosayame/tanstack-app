import { z, ZodTypeAny } from 'zod';

export type DTOToType<T extends ZodTypeAny> = z.infer<T>;
