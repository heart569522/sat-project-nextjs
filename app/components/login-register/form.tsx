'use client';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
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
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="login-registerSelectedTab"
        >
          <Tab label="เข้าสู่ระบบ" {...a11yProps(0)} />
          <Tab label="สมัครสมาชิก" {...a11yProps(1)} />
        </Tabs>
      </Box>
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
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            เลือกตำแหน่ง
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="อาจารย์"
              control={<Radio />}
              label="อาจารย์"
            />
            <FormControlLabel
              value="นักศึกษา"
              control={<Radio />}
              label="นักศึกษา"
            />
          </RadioGroup>
        </FormControl>
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
                placeholder="Jane"
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
                placeholder="Jane"
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
                placeholder="Username"
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
                className="mb-3 block w-full appearance-none rounded borderbg-white px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="grid-comfirm-password"
                type="password"
                placeholder="********"
              />
            </div>
          </div>
          <div className="grid grid-cols-1">
          <div className="w-80 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-tel">
            เบอร์โทร์
          </label>
          <input className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-tel" type="tel" placeholder="000-000000" />
          </div>
          <div className="w-80 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
            อีเมล
          </label>
          <input className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="example@exammail.com" />
          </div>
          <div className="w-80 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
            คณะ
          </label>
          <input className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="example@exammail.com" />
          </div>
          </div>
        </form>
      </CustomTabPanel>
    </Box>
  );
}
