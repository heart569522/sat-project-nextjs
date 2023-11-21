import { lusitana } from '@/app/components/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Test Page',
};

export default async function Page({ }: {}) {
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Test</h1>
            </div>

            <form className="py-2">
                <div className={`mb-6 grid gap-6 md:grid-cols-2`}>
                    <div>
                        <label
                            htmlFor="first_name"
                            className="mb-2 block text-base font-medium"
                        >
                            1.ชื่อคณะ/วิทยาลัย/หน่วยงาน
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="John"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="last_name"
                            className="mb-2 block text-base font-medium text-gray-900"
                        >
                            2.ชื่อโครงการ
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Doe"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="company"
                            className="mb-2 block text-base font-medium text-gray-900 "
                        >
                            3.ผู้ดำเนินการ/ผู้รับผิดชอบโครงการ
                        </label>
                        <input
                            type="text"
                            id="company"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Flowbite"
                            required
                        />
                    </div>
                    {/* <div>
                        <label
                            htmlFor="phone"
                            className="mb-2 block text-base font-medium text-gray-900 "
                        >
                            Phone number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="123-45-678"
                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                            required
                        />
                    </div> */}
                    <div>
                        <label
                            htmlFor="website"
                            className="mb-2 block text-base font-medium text-gray-900 "
                        >
                            หมายเลขโทรศัพท์
                        </label>
                        <input
                            type="url"
                            id="website"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="flowbite.com"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="visitors"
                            className="mb-2 block text-base font-medium text-gray-900 "
                        >
                            Unique visitors (per month)
                        </label>
                        <input
                            type="text"
                            id="visitors"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            placeholder=""
                            required
                        />
                    </div>
                </div>
                <h3 className="mb-2 block text-base font-medium text-gray-900 ">
                    4.ความสอดคล้องกับยุทธศาสตร์ของคณะวิชา/มหาวิทยาลัยพายัพ
                </h3>
                <div className="mb-6 grid gap-x-6 gap-y-3 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="countries"
                            className="mb-2 block text-base font-medium text-gray-900"
                        >
                            4.1 ประเด็นยุทธศาสตร์ที่
                        </label>
                        <select
                            id="countries"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option selected>Choose a country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="countries"
                            className="mb-2 block text-base font-medium text-gray-900"
                        >
                            4.2 เป้าประสงค์ที่
                        </label>
                        <select
                            id="countries"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option selected>Choose a country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="countries"
                            className="mb-2 block text-base font-medium text-gray-900"
                        >
                            4.3 กลยุทธ์ระดับมหาวิทยาลัยที่
                        </label>
                        <select
                            id="countries"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option selected>Choose a country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="countries"
                            className="mb-2 block text-base font-medium text-gray-900"
                        >
                            4.4 ตัวชี้วัดแผนกลยุทธ์ที่
                        </label>
                        <select
                            id="countries"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option selected>Choose a country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="countries"
                            className="mb-2 block text-base font-medium text-gray-900"
                        >
                            4.5 ตัวชี้วัดแผนปฏิบัติการที่
                        </label>
                        <select
                            id="countries"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option selected>Choose a country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="countries"
                            className="mb-2 block text-base font-medium text-gray-900"
                        >
                            4.6 ตัวชี้วัดโครงการ
                        </label>
                        <select
                            id="countries"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option selected>Choose a country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="countries"
                            className="mb-2 block text-base font-medium text-gray-900"
                        >
                            4.7 สถานะโครงการ
                        </label>
                        <select
                            id="countries"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option selected>Choose a country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                        </select>
                    </div>
                </div>
                <h3 className="mb-2 block text-base font-medium text-gray-900 ">
                    5.ประเภทโครงการ
                </h3>
                <div className='rounded border border-gray-200 p-2'>
                    <div className="grid gap-x-6 gap-y-3 md:grid-cols-2">
                        <div className="flex items-center rounded border border-gray-200 ps-4">
                            <input
                                id="bordered-checkbox-1"
                                type="checkbox"
                                value=""
                                name="bordered-checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="bordered-checkbox-1"
                                className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                            >
                                แผนทำนุบำรุงศิลปวัฒนธรรม
                            </label>
                        </div>
                        <div className="flex items-center rounded border border-gray-200 ps-4">
                            <input
                                id="bordered-checkbox-1"
                                type="checkbox"
                                value=""
                                name="bordered-checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="bordered-checkbox-1"
                                className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                            >
                                แผนบริการวิชาการ
                            </label>
                        </div>
                        <div className="flex items-center rounded border border-gray-200 ps-4">
                            <input
                                id="bordered-checkbox-1"
                                type="checkbox"
                                value=""
                                name="bordered-checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="bordered-checkbox-1"
                                className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                            >
                                แผนการจัดการความรู้
                            </label>
                        </div>
                        <div className="flex items-center rounded border border-gray-200 ps-4">
                            <input
                                id="bordered-checkbox-1"
                                type="checkbox"
                                value=""
                                name="bordered-checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="bordered-checkbox-1"
                                className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                            >
                                แผนการส่งเสริมงานวิจัย
                            </label>
                        </div>
                        <div className="flex items-center rounded border border-gray-200 ps-4">
                            <input
                                id="bordered-checkbox-1"
                                type="checkbox"
                                value=""
                                name="bordered-checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="bordered-checkbox-1"
                                className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                            >
                                แผนการประกันคุณภาพการศึกษา
                            </label>
                        </div>
                        <div className="flex items-center rounded border border-gray-200 ps-4">
                            <input
                                id="bordered-checkbox-1"
                                type="checkbox"
                                value=""
                                name="bordered-checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="bordered-checkbox-1"
                                className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                            >
                                แผนพัฒนาบุคลากร
                            </label>
                        </div>
                        <div className="flex items-center rounded border border-gray-200 ps-4">
                            <input
                                id="bordered-checkbox-1"
                                type="checkbox"
                                value=""
                                name="bordered-checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="bordered-checkbox-1"
                                className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                            >
                                แผนบริหารความเสี่ยง
                            </label>
                        </div>
                    </div>
                    <div className='rounded border border-gray-200 my-3'>
                        <div className="grid gap-x-6 gap-y-3 md:grid-cols-1">
                            <div className="flex items-center ps-4">
                                <input
                                    id="bordered-checkbox-1"
                                    type="checkbox"
                                    value=""
                                    name="bordered-checkbox"
                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="bordered-checkbox-1"
                                    className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                                >
                                    แผนพัฒนานักศึกษาตามกรอบมาตรฐานคุณวุฒิ และกิจกรรมพัฒนานักศึกษา <b>(เลือกได้มากกว่า 1 ประเภท)</b>
                                </label>
                            </div>
                        </div>
                        <div className="grid gap-x-6 gap-y-0 md:grid-cols-2 px-2 pt-0 pb-2">
                            <div className="flex items-center ps-4">
                                <input
                                    id="bordered-checkbox-1"
                                    type="checkbox"
                                    value=""
                                    name="bordered-checkbox"
                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="bordered-checkbox-1"
                                    className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                                >
                                    ด้านคุณธรรม จริยธรรม
                                </label>
                            </div>
                            <div className="flex items-center ps-4">
                                <input
                                    id="bordered-checkbox-1"
                                    type="checkbox"
                                    value=""
                                    name="bordered-checkbox"
                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="bordered-checkbox-1"
                                    className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                                >
                                    กิจกรรมด้านวิชาการที่ส่งเสริมคุณลักษณะที่พึงประสงค์
                                </label>
                            </div>
                            <div className="flex items-center ps-4">
                                <input
                                    id="bordered-checkbox-1"
                                    type="checkbox"
                                    value=""
                                    name="bordered-checkbox"
                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="bordered-checkbox-1"
                                    className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                                >
                                    ด้านความรู้
                                </label>
                            </div>
                            <div className="flex items-center ps-4">
                                <input
                                    id="bordered-checkbox-1"
                                    type="checkbox"
                                    value=""
                                    name="bordered-checkbox"
                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="bordered-checkbox-1"
                                    className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                                >
                                    กิจกรรมบำเพ็ญประโยชน์หรือรักษาสิ่งแวดล้อม
                                </label>
                            </div>
                            <div className="flex items-center ps-4">
                                <input
                                    id="bordered-checkbox-1"
                                    type="checkbox"
                                    value=""
                                    name="bordered-checkbox"
                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="bordered-checkbox-1"
                                    className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                                >
                                    ด้านทักษะทางปัญญา
                                </label>
                            </div>
                            <div className="flex items-center ps-4">
                                <input
                                    id="bordered-checkbox-1"
                                    type="checkbox"
                                    value=""
                                    name="bordered-checkbox"
                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="bordered-checkbox-1"
                                    className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                                >
                                    กิจกรรมกีฬา และการส่งเสริมสุขภาพ
                                </label>
                            </div>
                            <div className="flex items-center ps-4">
                                <input
                                    id="bordered-checkbox-1"
                                    type="checkbox"
                                    value=""
                                    name="bordered-checkbox"
                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="bordered-checkbox-1"
                                    className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                                >
                                    ด้านทักษะด้านความสัมพันธ์ระหว่างบุคคลและความรับผิดชอบ
                                </label>
                            </div>
                            <div className="flex items-center ps-4">
                                <input
                                    id="bordered-checkbox-1"
                                    type="checkbox"
                                    value=""
                                    name="bordered-checkbox"
                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="bordered-checkbox-1"
                                    className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                                >
                                    กิจกรรมส่งเสริมศิลปะและวัฒนธรรม
                                </label>
                            </div>
                            <div className="flex items-center ps-4">
                                <input
                                    id="bordered-checkbox-1"
                                    type="checkbox"
                                    value=""
                                    name="bordered-checkbox"
                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="bordered-checkbox-1"
                                    className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                                >
                                    ด้านทักษะการวิเคราะห์เชิงตัวเลข การสื่อสาร และการใช้เทคโนโลยี
                                </label>
                            </div>
                            <div className="flex items-center ps-4">
                                <input
                                    id="bordered-checkbox-1"
                                    type="checkbox"
                                    value=""
                                    name="bordered-checkbox"
                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="bordered-checkbox-1"
                                    className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                                >
                                    กิจกรรมเสริมสร้างคุณธรรม จริยธรรม
                                </label>
                            </div>
                            <div className="flex items-center ps-4">
                                <input
                                    id="bordered-checkbox-1"
                                    type="checkbox"
                                    value=""
                                    name="bordered-checkbox"
                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="bordered-checkbox-1"
                                    className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                                >
                                    กิจกรรมส่งเสริมพัฒนาทักษะชีวิตความเป็นผู้นำ
                                </label>
                            </div>
                            <div className="ps-4">
                                <div className='flex items-center'>
                                    <input
                                        id="bordered-checkbox-1"
                                        type="checkbox"
                                        value=""
                                        name="bordered-checkbox"
                                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                    />
                                    <label
                                        htmlFor="bordered-checkbox-1"
                                        className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                                    >
                                        อื่นๆ
                                    </label>
                                    <div className="border-b border-gray-300">
                                        <input
                                            type="text"
                                            id="website"
                                            className="w-full rounded bg-gray-50 text-base text-gray-900"
                                            placeholder="โปรดระบุ"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-x-6 gap-y-3 md:grid-cols-2">
                        <div className="rounded border border-gray-200 ps-4">
                            <div className='flex items-center'>
                                <input
                                    id="bordered-checkbox-1"
                                    type="checkbox"
                                    value=""
                                    name="bordered-checkbox"
                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="bordered-checkbox-1"
                                    className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                                >
                                    อื่นๆ
                                </label>
                                <div className="border-b border-gray-300">
                                    <input
                                        type="text"
                                        id="website"
                                        className="w-full rounded bg-gray-50 text-base text-gray-900"
                                        placeholder="โปรดระบุ"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
