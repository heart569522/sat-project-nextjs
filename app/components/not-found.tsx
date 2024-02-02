import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';

export function TableRowFullNotFound({ countColumn }: { countColumn: number }) {
  return (
    <tr className="w-full animate-pulse bg-white">
      <td colSpan={countColumn} scope="col" className="px-4 py-5">
        <div className="flex items-center justify-center gap-2 text-gray-500">
          <SentimentDissatisfiedOutlinedIcon />
          <p className="">ไม่พบข้อมูล</p>
        </div>
      </td>
    </tr>
  );
}

export function TableRowMobileNotFound() {
  return (
    <div className="w-full animate-pulse bg-white px-4 py-5">
      <div className="flex items-center justify-center gap-2 text-gray-500">
        <SentimentDissatisfiedOutlinedIcon />
        <p className="">ไม่พบข้อมูล</p>
      </div>
    </div>
  );
}
