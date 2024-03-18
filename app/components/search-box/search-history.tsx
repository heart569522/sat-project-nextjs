'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function SearchHistory() {
  const [searchValue, setSearchValue] = useState('');
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleInputChange = (event: any) => {
    const numericValue = event.target.value.replace(/\D/g, '').slice(0, 10);
    setSearchValue(numericValue);
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams);

    setSearchValue('');
    params.delete('query');
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = () => {
    console.log(`Searching... ${searchValue}`);

    const params = new URLSearchParams(searchParams);

    if (searchValue) {
      params.set('query', searchValue);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative">
      <h3 className="mb-3 block text-center text-2xl font-semibold text-blue-900 max-sm:text-lg">
        ค้นหาประวัติการเข้าร่วมโครงการ/กิจกรรม
      </h3>
      <div className="flex flex-1 flex-shrink-0">
        <label
          htmlFor="search"
          className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Search
        </label>
        <div className="relative w-full">
          <input
            type="number"
            id="search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="รหัสประจำตัวนักศึกษา"
            autoComplete="off"
            value={searchValue}
            onChange={handleInputChange}
            required
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-x-1">
        <button
          className="ml-2 rounded-md border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-100"
          type="reset"
          onClick={handleReset}
        >
          รีเซ็ท
        </button>
        <button
          className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
          onClick={handleSearch}
        >
          ค้นหา
        </button>
      </div>
    </div>
  );
}
