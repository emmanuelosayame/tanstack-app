import { z } from 'zod';

export const GetBlogsDTO = z.object({
  _limit: z.string().or(z.number()).optional(),
  page: z.string().or(z.number()).optional(),
  offset: z.number().optional(),
});
