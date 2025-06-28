import { isRouteErrorResponse, useParams, useRouteError } from 'react-router';

type StatusHandler = (info: {
  error: any;
  params: Record<string, string | undefined>;
}) => any;

export function GeneralErrorBoundary({
  defaultStatusHandler = ({ error }) => (
    <p className='bg-red-400'>
      {error.status} {error.data}
    </p>
  ),
  statusHandlers,
  unexpectedErrorHandler = (error) => <p>{getErrorMessage(error)}</p>,
}: {
  defaultStatusHandler?: StatusHandler;
  statusHandlers?: Record<number, StatusHandler>;
  unexpectedErrorHandler?: (error: unknown) => any;
}) {
  const error = useRouteError();
  const params = useParams();

  if (typeof document !== 'undefined') {
    console.log(error);
  }
  return isRouteErrorResponse(error)
    ? (statusHandlers?.[error.status] ?? defaultStatusHandler)({
        error,
        params,
      })
    : unexpectedErrorHandler(error);
}

export function getErrorMessage(error: unknown) {
  if (typeof error === 'string') return error;
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }
  console.error('Unable to get error message for error', error);
  return 'Unknown Error';
}
