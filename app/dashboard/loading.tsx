import { CircularProgress } from '@mui/material';

export default function loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <CircularProgress />
      <span className="ml-4 text-lg font-medium">Loading...</span>
    </div>
  );
}
