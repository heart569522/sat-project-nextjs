import { CircularProgress } from '@mui/material';

export function ActivityHistoryLoading() {
  return (
    <div className="flex w-full items-center justify-center p-2">
      <CircularProgress />
      <span className="ml-4 text-lg font-medium">Loading...</span>
    </div>
  );
}

export function DocumentLoading() {
  return (
    <section id="box" className="box text-black">
      <div id="box-area" className="box-area">
        <div id="page-height" className="page-height">
          <div className='flex justify-center items-center mt-20'>
            <CircularProgress />
            <span className="ml-4 text-lg font-medium">Loading...</span>
          </div>
        </div>
      </div>
    </section>
  );
}
