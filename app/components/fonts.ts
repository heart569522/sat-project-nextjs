import {
  Inter,
  Lusitana,
  Noto_Sans_Thai_Looped,
  Sarabun,
  Rajdhani,
} from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const notoThai = Noto_Sans_Thai_Looped({
  subsets: ['thai'],
  weight: ['400', '600', '700'],
  display: 'swap',
  adjustFontFallback: false,
});

export const sarabun = Sarabun({
  subsets: ['thai'],
  weight: ['400', '500', '600', '700'],
});
