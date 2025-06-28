import { Link, LoaderFunctionArgs } from 'react-router-dom';
import type { Route } from './+types/_index';
import { queryLoader } from '../services';
import { BlogEndpoints } from '../services/blog';
import { useQuery } from '@tanstack/react-query';

const recentPosts = [
  {
    id: '1',
    title: 'Welcome to the Blog',
    summary:
      'This is your first post! Discover what you can do with this modern blog app.',
    date: '2024-06-01',
  },
  {
    id: '2',
    title: 'React Router v7 File Routing',
    summary:
      'How to use file-based routing in React Router v7 for scalable apps.',
    date: '2024-06-02',
  },
  {
    id: '3',
    title: 'React Router v7 File Routing',
    summary:
      'How to use file-based routing in React Router v7 for scalable apps.',
    date: '2024-06-02',
  },
  {
    id: '4',
    title: 'React Router v7 File Routing',
    summary:
      'How to use file-based routing in React Router v7 for scalable apps.',
    date: '2024-06-02',
  },
];

export async function clientLoader({ params }: LoaderFunctionArgs) {
  const posts = queryLoader(
    BlogEndpoints.getPosts({ page: 1, offset: 0, _limit: 10 })
  );

  return { posts };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { data, isLoading } = useQuery(
    BlogEndpoints.getPosts({ page: 1, offset: 0, _limit: 10 })
  );

  return (
    <div className='max-w-3xl mx-auto py-16 px-4'>
      <section className='mb-12 text-center'>
        <h1 className='text-5xl font-semibold mb-4 text-blue-700'>
          Welcome to My Blog
        </h1>
        <p className='text-lg text-gray-600 mb-6'>
          A modern, beautiful blog app built with React Router and Vite.
        </p>
        <Link
          to='/blog'
          className='inline-block bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition'>
          View Blog
        </Link>
      </section>
      <section>
        <h2 className='text-2xl font-bold mb-4'>Recent Posts</h2>
        <div className='grid gap-6'>
          {isLoading
            ? Array(10)
                .fill('')
                .map((_, idx) => (
                  <div
                    key={idx}
                    className='block rounded-lg border border-gray-200 bg-white shadow p-6 animate-pulse'>
                    <div className='h-6 w-2/3 bg-gray-200 rounded mb-3' />
                    <div className='h-4 w-1/4 bg-gray-200 rounded mb-4' />
                    <div className='h-4 w-full bg-gray-200 rounded mb-2' />
                    <div className='h-4 w-5/6 bg-gray-200 rounded mb-2' />
                    <div className='h-4 w-2/3 bg-gray-200 rounded' />
                  </div>
                ))
            : data?.map((post) => (
                <Link
                  to={`/blog/${post.id}`}
                  key={post.id}
                  className='block rounded-lg border border-gray-200 bg-white shadow hover:shadow-lg transition p-6'>
                  <h3 className='text-xl font-semibold mb-1'>{post.title}</h3>
                  <div className='text-gray-500 text-xs mb-2'>
                    {new Date().toLocaleDateString()}
                  </div>
                  <p className='text-gray-700'>{post.body}</p>
                </Link>
              ))}
        </div>
      </section>
    </div>
  );
}
