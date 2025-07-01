import { z } from 'zod';

export const GetBlogsDTO = z.object({
  _limit: z.string().or(z.number()).optional(),
  page: z.string().or(z.number()).optional(),
  offset: z.number().optional(),
});

export const AddPostDTO = z.object({
  title: z.string(),
  body: z.string(),
  userId: z.number(),
});
