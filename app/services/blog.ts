import { fetcher } from '.';
import { PostRes } from '../dto/responses';
import { DTOToType } from '../dto';
import { GetBlogsDTO } from '../dto/blog';

export const BlogEndpoints = {
  getPosts: (req: DTOToType<typeof GetBlogsDTO>) => ({
    queryKey: ['POSTS'],
    queryFn: () =>
      fetcher<PostRes[]>({
        url: 'https://jsonplaceholder.typicode.com/posts',
        params: req,
      }),
  }),
};
