'use client';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormHelperText, MenuItem, Select } from '@mui/material';
import Link from 'next/link';
import { Button } from '../buttons/button';
import { Faculties, Majors } from '@/app/model/faculties-majors';
import { getAllData } from '@/app/lib/api-service';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Form() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [formInput, setFormInput] = useState({
    firstname: '',
    lastname: '',
    studentId: '',
    phone: '',
    major: '',
    faculty: '',
    email: '',
    username: '',
    password: '',
  });

  const [faculties, setFaculties] = useState<Faculties[]>([]);
  const [majors, setMajors] = useState<Majors[]>([]);

  const getFaculties = async () => {
    try {
      const data = await getAllData('faculties');
      setFaculties(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMajors = async () => {
    try {
      const data = await getAllData('majors');
      setMajors(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('fetch list fac/major');

    const fetchData = async () => {
      await getFaculties();
      await getMajors();
    };

    fetchData();
  }, []);

  const [validationError, setValidationError] = useState<{
    [key: string]: string;
  }>({});

  const handleFacultyChange = (event: { target: { value: any } }) => {
    const facultyValue = event.target.value;
    setFormInput((prevInput) => ({
      ...prevInput,
      faculty: facultyValue,
      major: '', // Reset major when changing faculty
    }));
    setValidationError((prevError) => ({ ...prevError, faculty: '' }));
  };

  const handleMajorChange = (event: { target: { value: any } }) => {
    const majorValue = event.target.value;
    setFormInput((prevInput) => ({ ...prevInput, major: majorValue }));
    setValidationError((prevError) => ({ ...prevError, major: '' }));
  };

  return (
    <div className='bg-gray-50' style={{ width: '100%' }}>
      <div style={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="login-registerSelectedTab"
          variant="fullWidth"
          centered
        >
          <Tab className='p-4 bg-orange-500' label="เข้าสู่ระบบ" {...a11yProps(0)} />
          <Tab label="สมัครสมาชิก" {...a11yProps(1)} />
        </Tabs>
      </div>
      <CustomTabPanel value={value} index={0}>
        <div className="w-full max-w-xs">
          <form className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Username
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                รหัสผ่าน
              </label>
              <input
                className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="password"
                type="password"
                placeholder="รหัสผ่าน 6 ตัว"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="button"
              >
                เข้าสู่ระบบ
              </button>
            </div>
          </form>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <form action="" className="grid grid-cols-2">
          <div className="grid grid-cols-2">
            <div className="mb-6 w-full md:mb-0 md:ps-2">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="grid-first-name"
              >
                ชื่อ
              </label>
              <input
                className="mb-3 block w-full appearance-none rounded border bg-white py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                id="grid-first-name"
                type="text"
                placeholder="ชื่อจริง"
              />
            </div>
            <div className="mb-6 w-full md:mb-0 md:ps-2">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="grid-last-name"
              >
                นามสกุล
              </label>
              <input
                className="mb-3 block w-full appearance-none rounded border bg-white py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                id="grid-last-name"
                type="text"
                placeholder="นามสกุลจริง"
              />
            </div>
            <div className="col-span-2 mb-6 w-full md:mb-0 md:ps-2">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="username"
              >
                ชื่อผู้ใช้งาน
              </label>
              <input
                className="mb-3 block w-full appearance-none rounded border bg-white py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                id="username"
                type="text"
                placeholder="ชื่อผู้ใช้งาน"
              />
            </div>
            <div className="col-span-2 mb-6 w-full md:mb-0 md:ps-2">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="grid-password"
              >
                รหัสผ่าน
              </label>
              <input
                className="mb-3 block w-full appearance-none rounded border bg-white px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="grid-password"
                type="password"
                placeholder="********"
              />
            </div>
            <div className="col-span-2 mb-6 w-full md:mb-0 md:ps-2">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="grid-comfirm-password"
              >
                ยืนยันรหัสผ่าน
              </label>
              <input
                className="borderbg-white mb-3 block w-full appearance-none rounded px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="grid-comfirm-password"
                type="password"
                placeholder="********"
              />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="w-80 px-3">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="grid-tel"
              >
                เบอร์โทร์
              </label>
              <input
                className="block w-full appearance-none rounded border bg-white px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="grid-tel"
                type="tel"
                placeholder="000-000000"
              />
            </div>
            <div className="w-80 px-3">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="grid-email"
              >
                อีเมล
              </label>
              <input
                className="block w-full appearance-none rounded border bg-white px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="grid-email"
                type="email"
                placeholder="example@exammail.com"
              />
            </div>
            <div className="w-80 px-3">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="grid-email"
              >
                คณะ
              </label>
              <FormControl
                className="w-full appearance-none rounded border px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                error={Boolean(validationError.faculty)}
              >
                <Select
                  className="bg-white"
                  name="faculty"
                  value={formInput.faculty}
                  onChange={handleFacultyChange}
                >
                  {faculties.map((faculty) => (
                    <MenuItem key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{validationError.faculty}</FormHelperText>
              </FormControl>
            </div>
            <div className="w-80 px-3">
              <label
                htmlFor="major"
                className={`mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700`}
              >
                สาขาวิชา
              </label>
              <FormControl className="w-full appearance-none rounded border px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none">
                <Select
                  className="bg-white"
                  name="major"
                  value={formInput.major}
                  onChange={handleMajorChange}
                  disabled={!formInput.faculty}
                >
                  {majors
                    .filter(
                      (major) => major.faculty_id === Number(formInput.faculty),
                    )
                    .map((filteredMajor) => (
                      <MenuItem key={filteredMajor.id} value={filteredMajor.id}>
                        {filteredMajor.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/login-register"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              ยกเลิก
            </Link>
            <Button type="submit">สมัครสมาชิก</Button>
          </div>
        </form>
      </CustomTabPanel>
    </div>
  );
}
