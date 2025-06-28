import { useParams, Link } from 'react-router-dom';

export default function BlogPost() {
  const { id } = useParams();
  return (
    <div className='max-w-2xl mx-auto py-12 px-4'>
      <Link to='..' className='text-blue-600 hover:underline mb-6 inline-block'>
        ← Back to Blog
      </Link>
      <h1 className='text-3xl font-bold mb-4 text-blue-700'>Blog Post {id}</h1>
      <div className='text-gray-700 text-lg bg-white rounded-lg shadow p-6'>
        This is a placeholder for blog post{' '}
        <span className='font-mono'>{id}</span>.
      </div>
    </div>
  );
}
