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
          <div className="mt-20 flex items-center justify-center">
            <CircularProgress />
            <span className="ml-4 text-lg font-medium">Loading...</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function OverlayLoading({ showLoading }: { showLoading: boolean }) {
  return (
    <>
      {showLoading && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="flex items-center">
            <CircularProgress />
            <span className="ml-4 text-lg font-medium text-white">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}
