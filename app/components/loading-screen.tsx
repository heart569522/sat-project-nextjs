import { CircularProgress } from "@mui/material";

export default function ActivityHistoryLoading() {
  return (
    <div className="flex w-full p-2 items-center justify-center">
      <CircularProgress />
      <span className="ml-4 text-lg font-medium">Loading...</span>
    </div>
  );
}
