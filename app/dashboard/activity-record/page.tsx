'use client';
import PN10Form from '@/app/components/form/pn10-form';
import { Metadata } from 'next';
import { PDFDocument } from 'pdf-lib';
import axios from 'axios';
import { useEffect, useState } from 'react';

// export const metadata: Metadata = {
//   title: 'บันทึกการเข้าร่วมโครงการ/กิจกรรม',
// };

export default async function Page({}: {}) {
  const [formFieldNames, setFormFieldNames] = useState<string[]>([]);

  const listFormFields = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfBytes = new Uint8Array(arrayBuffer);
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const form = pdfDoc.getForm();
      const fieldNames = form.getFields().map((field) => field.getName());

      // Set the form field names to the state
      setFormFieldNames(fieldNames);

      console.log('Form Field Names:', fieldNames);
    } catch (error) {
      console.error('Error processing PDF:', error);
    }
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const file = fileInput.files && fileInput.files[0];

    if (file) {
      listFormFields(file);
    }
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>บันทึกการเข้าร่วมโครงการ/กิจกรรม</h1>
      </div>
      <div className="mt-4">
        {/* <PN10Form /> */}
        <div>
          <input type="file" accept=".pdf" onChange={handleFileUpload} />
          <p>Check console for form field names after uploading a PDF file.</p>
        </div>
      </div>
    </div>
  );
}
