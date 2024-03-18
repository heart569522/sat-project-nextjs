'use client';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { sarabun } from '../fonts';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function ShowRichText({ text }: { text: any }) {
  const modules = {
    toolbar: false, // Disables the toolbar
  };

  return (
    <ReactQuill
      value={text}
      readOnly
      theme="snow"
      modules={modules}
      className={`${sarabun.className}`}
      style={{ border: 'none' }}
    />
  );
}
