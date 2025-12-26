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
  if (dateStr) return new Date(dateStr).toLocaleDateString(COUNTRY_CODE.VN);

  return '';
}
