import {
  Inter,
  Lusitana,
  Noto_Sans_Thai_Looped,
} from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const notoThai = Noto_Sans_Thai_Looped({
  subsets: ['thai'],
  weight: ['400', '700'],
});
