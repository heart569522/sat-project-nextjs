
import { Alert } from '@mui/material';
import {
  HistoryActivity,
  OriginalDataHistory,
  OriginalHistory,
} from '@/app/model/history-activity';

const fetchHistoryActivity = async (
  query: string,
): Promise<HistoryActivity[]> => {
  try {
    const res = await fetch(
      `${process.env.APP_SCRIPT_SHEET}?studentId=${query}`,
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const originalData: OriginalDataHistory = await res.json();

    if (!originalData.data || originalData.data.length === 0) {
      return [];
    }

    const dataArray = originalData.data;

    const transformedData: HistoryActivity[] = dataArray.reduce(
      (acc: HistoryActivity[], project: OriginalHistory) => {
        const existingEntry = acc.find(
          (entry) => entry.studentId === project.studentId.toString(),
        );

        if (existingEntry) {
          existingEntry.history.push({
            id: existingEntry.history.length + 1,
            projectName: project.projectName,
            academicYear: project.academicYear.toString(),
            serviceHour: project.serviceHour.toString(),
          });
        } else {
          acc.push({
            name: project.name,
            studentId: project.studentId.toString(),
            history: [
              {
                id: 1,
                projectName: project.projectName,
                academicYear: project.academicYear.toString(),
                serviceHour: project.serviceHour.toString(),
              },
            ],
          });
        }

        return acc;
      },
      [],
    );

    return transformedData;
  } catch (error: any) {
    console.error('Error fetching data:', error.message);
    return [];
  }
};

export default async function HistoryActivityTable({
  query,
}: {
  query: string;
}) {
  const resultData = await fetchHistoryActivity(query);
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
              resultData.map((data: any, i: any) => (
                <div key={i}>
                  <div className="mb-2 grid grid-cols-2 max-md:grid-cols-1">
                    <div className="flex justify-start gap-x-1 py-1">
                      <label className="font-semibold">ชื่อ :</label>
                      <p className="whitespace-nowrap">
                        {data.name}
                      </p>
                    </div>
                    <div className="flex justify-start gap-x-1 py-1">
                      <label className="font-semibold">รหัสประจำตัว :</label>
                      <p className="whitespace-nowrap">{data.studentId}</p>
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
                        data.history.map((row: any) => (
                          <div
                            key={row.id}
                            className="mb-2 w-full rounded-md bg-white p-4"
                          >
                            <div className="flex w-full items-center border-b pb-3">
                              <h3 className="text-lg">{row.projectName}</h3>
                            </div>
                            <div className="flex w-full items-center justify-between border-b py-3">
                              <div className="flex w-1/2 flex-col">
                                <p className="text-xs">ปีการศึกษา</p>
                                <p className="font-medium">{row.academicYear}</p>
                              </div>
                              <div className="flex w-1/2 flex-col">
                                <p className="text-xs">จำนวนชั่วโมง</p>
                                <p className="font-medium">
                                  {row.serviceHour}&nbsp;ชั่วโมง
                                </p>
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
                          data.history.map((row: any) => (
                            <tr key={row.id} className="group text-center">
                              <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-base text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                                {row.id}
                              </td>
                              <td className="whitespace-nowrap bg-white px-4 py-5 text-base text-left">
                                {row.projectName}
                              </td>
                              <td className="whitespace-nowrap bg-white px-4 py-5 text-base">
                                {row.academicYear}
                              </td>
                              <td className="whitespace-nowrap bg-white px-4 py-5 text-base group-first-of-type:rounded-md group-last-of-type:rounded-md">
                                {row.serviceHour}
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
