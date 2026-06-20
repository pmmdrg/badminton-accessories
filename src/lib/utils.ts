import { COUNTRY_CODE } from './constants';

export function isValidImageSrc(src?: string) {
  if (src) {
    if (src.length > 0) {
      if (src.startsWith('http://') || src.startsWith('https://')) {
        return true;
      }

      if (src.startsWith('/')) {
        return true;
      }

      if (src.startsWith('blob')) {
        return true;
      }
    }
  }

  return false;
}

export function normalizedSelectOptions(label: string, value: string | number) {
  return { label: label, value: value };
}

export function capitalizeFirst(str: string, locale = COUNTRY_CODE.VN) {
  if (!str) return '';
  return str[0].toLocaleUpperCase(locale) + str.slice(1);
}

export function normalizedDate(dateStr?: string | null) {
  if (!dateStr) return '';

  return new Date(dateStr).toLocaleDateString(COUNTRY_CODE.VN);
}

export function normalizedTime(timeStr?: string | null) {
  if (!timeStr) return '';

  return new Date(timeStr).toLocaleTimeString(COUNTRY_CODE.VN);
}

export function normalizedDateTime(dateTimeStr?: string | null) {
  if (!dateTimeStr) return '';

  const timeConverted = normalizedTime(dateTimeStr);
  const dateConverted = normalizedDate(dateTimeStr);

  return `${timeConverted.slice(0, timeConverted.length - 3)} ${dateConverted}`;
}
