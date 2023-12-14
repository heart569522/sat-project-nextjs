'use client';
import React, { useState } from 'react';

export default function PN10Form() {
  const [validationError, setValidationError] = useState<{
    [key: string]: string;
  }>({});

  const [formInput, setFormInput] = useState({

  });

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
    <form onSubmit={handleSubmit} className="py-2">
      <div className="rounded-md border-2 border-gray-100 p-4 md:p-6">
        <div className={`mb-0 grid gap-6 md:grid-cols-2`}>
            <div>

            </div>
        </div>
      </div>
    </form>
  );
}
