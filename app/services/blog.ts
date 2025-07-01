import { fetcher, invalidate } from '.';
import { PostRes } from '../dto/responses';
import { DTOToType } from '../dto';
import { AddPostDTO, GetBlogsDTO } from '../dto/blog';

export const BlogEndpoints = {
  getPosts: (req: DTOToType<typeof GetBlogsDTO>) => ({
    queryKey: ['POSTS'],
    queryFn: () =>
      fetcher<PostRes[]>({
        url: 'https://jsonplaceholder.typicode.com/posts',
        params: req,
      }),
  }),
  addPost: (post: DTOToType<typeof AddPostDTO>) => ({
    mutationFn: (v: typeof post) =>
      fetcher<PostRes>({
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/posts',
        data: v,
      }),
    variables: post,
    mutationKey: ['POSTS'], //Optional
    onSuccess: () => invalidate([['POSTS']]),
  }),
};
