import './index.css';
import {
  Link,
  Links,
  Meta,
  Navigate,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import { Fallback } from './domains/fallback';
import { GlobalLoading } from './domains/global-loading';
import { Toaster } from 'sonner';
import { GeneralErrorBoundary } from './domains/general-error-boundary';
import { QueryClientProvider } from '@tanstack/react-query';
import { appQueryClient } from './services';

export const links = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap',
  },

  {
    rel: 'icon',
    type: 'image/svg+xml',
    href: '/favicon.ico',
  },
];

export function meta() {
  return [
    { name: 'title', content: 'Blog Tansack App' },
    {
      name: 'description',
      content: 'Manage all your stores from one Platform',
    },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const HydrateFallback = Fallback;

export default function App() {
  return (
    <QueryClientProvider client={appQueryClient}>
      <GlobalLoading />
      <div className='min-h-screen flex flex-col bg-gray-50 font-space-grotesk'>
        <header className='z-50 shadow sticky top-0 bg-black/10'>
          <nav className='container mx-auto flex gap-6 p-4 items-center'>
            <span className='font-semibold text-lg text-blue-700'>My Blog</span>
            <Link
              to='/'
              className='hover:underline duration-300 transition-all'>
              Home
            </Link>
            <Link to='/about' className='hover:underline'>
              About
            </Link>
            <Link to='/blog' className='hover:underline'>
              Blog
            </Link>
          </nav>
        </header>
        <div className='flex-1 mx-auto py-8 max-w-3xl w-full'>
          <Outlet />
        </div>
        <footer className='bg-white border-t py-4 text-center text-gray-500'>
          &copy; {new Date().getFullYear()} My Blog. All rights reserved.
        </footer>
      </div>
      <Toaster
        position='bottom-center'
        // toastOptions={
        //   {
        //     // style: {
        //     //   background: 'red',
        //     // },
        //     // className:
        //   }
        // }
      />
    </QueryClientProvider>
  );
}

export function ErrorBoundary() {
  // let message = 'Oops!';
  // let details = 'An unexpected error occurred.';
  // let stack: string | undefined;

  // if (isRouteErrorResponse(error)) {
  //   message = error.status === 404 ? '404' : 'Error';
  //   details =
  //     error.status === 404
  //       ? 'The requested page could not be found.'
  //       : error.statusText || details;
  // } else if (import.meta.env.DEV && error && error instanceof Error) {
  //   details = error.message;
  //   stack = error.stack;
  // }

  return (
    <GeneralErrorBoundary
      statusHandlers={{
        401: () => <Navigate to={'/'} />,
        // 404: () => '404',
        405: () => '405',
        500: () => '500',
      }}
      unexpectedErrorHandler={() => <></>}
    />
  );

  // return (
  //   <main className="pt-16 p-4 container mx-auto">
  //     <h1>{message}</h1>
  //     <p>{details}</p>
  //     {stack && (
  //       <pre className="w-full p-4 overflow-x-auto">
  //         <code>{stack}</code>
  //       </pre>
  //     )}
  //   </main>
  // );
}
