'use client';
import React, { useState } from 'react';

export default function PN10Form() {
  const [validationError, setValidationError] = useState<{
    [key: string]: string;
  }>({});

  const [formInput, setFormInput] = useState({});

  const handleSubmit = (event: any) => {
    event.preventDefault();

    // const isFormValid = validateForm();

    // if (isButton.submit && isFormValid) {
    //   const formData = setFinalFormData();
    //   console.log('formData: ',formData);
    // } else {
    //   console.error('Form validation failed. Please check the form fields.');
    // }
  };

  return (
    <form>
      <div className="relative">
      <h3 className="mb-3 block text-center text-2xl max-sm:text-lg font-semibold text-blue-900">
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
            // value={searchValue}
            // onChange={handleInputChange}
            required
          />
          
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-x-1">
        <button
          className="ml-2 rounded-md border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-100"
          type="reset"
          // onClick={handleReset}
        >
          รีเซ็ท
        </button>
        <button
          className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
          // onClick={handleSearch}
        >
          ค้นหา
        </button>
      </div>
    </div>
    </form>
  );
}
