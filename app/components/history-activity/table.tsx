import historyData from '@/app/model/historyData.json';
import { HistoryActivity } from '@/app/model/history-activity';
import { Alert } from '@mui/material';

const fetchHistoryActivity = (query: string): HistoryActivity[] => {
  const resultData = historyData.filter(
    (student) => student.studentId == query,
  );
  return resultData;
};

export default async function HistoryActivityTable({
  query,
}: {
  query: string;
}) {
  const resultData: HistoryActivity[] = await fetchHistoryActivity(query);
  console.log(resultData);

  return (
    <div className="w-full">
      <div className="flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            {resultData.length === 0 ? (
              <div className="w-full">
                <Alert severity="error">
                  ไม่พบข้อมูล — โปรดลองใหม่อีกครั้ง
                </Alert>
              </div>
            ) : (
              resultData.map((data, i) => (
                <div key={i}>
                  <div className="mb-2 grid grid-cols-2 max-md:grid-cols-1">
                    <div className="flex justify-start gap-x-1 py-1">
                      <label className="font-semibold">ชื่อ :</label>
                      <p className="whitespace-nowrap">
                        {data.firstname}&nbsp;{data.lastname}
                      </p>
                    </div>
                    <div className="flex justify-start gap-x-1 py-1">
                      <label className="font-semibold">รหัสประจำตัว :</label>
                      <p className="whitespace-nowrap">{data.studentId}</p>
                    </div>
                    <div className="flex justify-start gap-x-1 py-1">
                      <label className="font-semibold">คณะ/วิทยาลัย :</label>
                      <p className="whitespace-nowrap">{data.faculty}</p>
                    </div>
                    <div className="flex justify-start gap-x-1 py-1">
                      <label className="font-semibold">สาขาวิชา :</label>
                      <p className="whitespace-nowrap">{data.major}</p>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-md bg-gray-100 p-2 md:pt-0">
                    <div className="md:hidden">
                      {data.history.length === 0 ? (
                        <div className="w-full">
                          <div className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            <Alert severity="warning">
                              ไม่พบข้อมูลการเข้าร่วมโครงการ/กิจกรรม
                            </Alert>
                          </div>
                        </div>
                      ) : (
                        data.history.map((row) => (
                          <div
                            key={row.id}
                            className="mb-2 w-full rounded-md bg-white p-4"
                          >
                            <div className='flex w-full border-b pb-3 items-center'>
                              <h3 className='text-lg'>
                                {row.projectName}
                              </h3>
                            </div>
                            <div className="flex w-full items-center justify-between border-b py-3">
                              <div className="flex w-1/2 flex-col">
                                <p className="text-xs">ปีการศึกษา</p>
                                <p className="font-medium">{row.year}</p>
                              </div>
                              <div className="flex w-1/2 flex-col">
                                <p className="text-xs">จำนวนชั่วโมง</p>
                                <p className="font-medium">{row.projectHour}&nbsp;ชั่วโมง</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                      <thead className="rounded-md bg-gray-100 text-left font-bold">
                        <tr className="text-center">
                          <th
                            scope="col"
                            className="w-[10%] px-4 py-5 font-semibold sm:pl-6"
                          >
                            ลำดับ
                          </th>
                          <th
                            scope="col"
                            className="w-[60%] px-3 py-5 font-semibold"
                          >
                            โครงการ/กิจกรรม
                          </th>
                          <th
                            scope="col"
                            className="w-[15%] px-3 py-5 font-semibold"
                          >
                            ปีการศึกษา
                          </th>
                          <th
                            scope="col"
                            className="w-[15%] px-3 py-5 font-semibold"
                          >
                            จำนวนชั่วโมง
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200 text-gray-900">
                        {data.history.length === 0 ? (
                          <tr className="group">
                            <td
                              colSpan={4}
                              className="whitespace-nowrap bg-white px-4 py-5 text-sm"
                            >
                              <Alert severity="warning">
                                ไม่พบข้อมูลการเข้าร่วมโครงการ/กิจกรรม
                              </Alert>
                            </td>
                          </tr>
                        ) : (
                          data.history.map((row) => (
                            <tr key={row.id} className="group text-center">
                              <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                                {row.id}
                              </td>
                              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                                {row.projectName}
                              </td>
                              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                                {row.year}
                              </td>
                              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                                {row.projectHour}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
