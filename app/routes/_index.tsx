import { Link, LoaderFunctionArgs, useFetcher } from 'react-router-dom';
import type { Route } from './+types/_index';
import { queryLoader, mutationLoader } from '../services';
import { BlogEndpoints } from '../services/blog';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

export async function clientLoader({ params }: LoaderFunctionArgs) {
  const posts = queryLoader(
    BlogEndpoints.getPosts({ page: 1, offset: 0, _limit: 10 })
  );

  return { posts };
}

export const clientAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;
  const userId = Number(formData.get('userId'));
  //Util to convert form data to typed object
  await mutationLoader(BlogEndpoints.addPost({ title, body, userId }));
  return null;
};

export default function Index({ loaderData }: Route.ComponentProps) {
  const { data, isLoading } = useQuery(
    BlogEndpoints.getPosts({ page: 1, offset: 0, _limit: 10 })
  );

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState(1);
  const fetcher = useFetcher();

  // Reset modal and form on successful submit
  React.useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data !== undefined) {
      setShowModal(false);
      setTitle('');
      setBody('');
      setUserId(1);
    }
  }, [fetcher.state, fetcher.data]);

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
      {/* Add Post Button and Modal */}
      <div className='my-8 text-center'>
        <button
          className='bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition'
          onClick={() => setShowModal(true)}>
          Add Post
        </button>
      </div>
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
          <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative'>
            <button
              className='absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl'
              onClick={() => setShowModal(false)}
              aria-label='Close'>
              &times;
            </button>
            <h3 className='text-xl font-bold mb-4'>Add New Post</h3>
            <fetcher.Form method='post'>
              <div className='mb-4'>
                <label className='block mb-1 font-medium'>Title</label>
                <input
                  className='w-full border rounded px-3 py-2'
                  name='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-1 font-medium'>Body</label>
                <textarea
                  className='w-full border rounded px-3 py-2'
                  name='body'
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-1 font-medium'>User ID</label>
                <input
                  type='number'
                  className='w-full border rounded px-3 py-2'
                  name='userId'
                  value={userId}
                  onChange={(e) => setUserId(Number(e.target.value))}
                  min={1}
                  required
                />
              </div>
              <button
                type='submit'
                className='bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition w-full'
                disabled={fetcher.state === 'submitting'}>
                {fetcher.state === 'submitting' ? 'Adding...' : 'Add Post'}
              </button>
            </fetcher.Form>
          </div>
        </div>
      )}
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
