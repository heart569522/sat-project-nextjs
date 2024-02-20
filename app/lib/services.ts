import { auth } from '@/auth';
import moment from 'moment-timezone';
import { ThaiBaht } from 'thai-baht-text-ts';

export const getCurrentDateAndTime = () => {
  const now = new Date();
  const year = now.getFullYear() + 543;
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();

  return {
    date: `${day}/${month}/${year}`,
    time: `${hour}:${minute} น.`,
  };
};

export const convertStringToThaiBathText = (value: string | undefined) => {
  const numberValue = Number(value?.replace(/,/g, ''));
  if (isNaN(numberValue)) {
    console.error('Invalid numeric value');
    return null;
  }
  return ThaiBaht(numberValue);
};

export const convertISOStringToDateText = (value: any) => {
  const formattedDate = new Intl.DateTimeFormat('th-TH-u-ca-buddhist', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(value));
  return formattedDate;
};

export const convertISOStringToTimeText = (value: any) => {
  const formattedTime = moment(value).tz('Asia/Bangkok').format('HH:mm น.');
  return formattedTime;
};

export const convertISOStringToDateTimeText = (value: any) => {
  const momentDateTime = moment(value).tz('Asia/Bangkok');
  const formattedDate = new Intl.DateTimeFormat('th-TH-u-ca-buddhist', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(momentDateTime.toDate());
  const formattedTime = momentDateTime.format('HH:mm');
  const formattedDateTime = `${formattedDate} ${formattedTime} น.`;
  return formattedDateTime;
};

export const convertToLocaleString = (value: any) => {
  const formattedAmount = Number(value).toLocaleString('en-US');
  return formattedAmount;
};
