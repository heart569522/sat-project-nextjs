'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

// This is temporary
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
        default:
          return 'ผิดพลาด, โปรดลองใหม่อีกครั้ง';
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
}
