export enum STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export enum COUNTRY_CODE {
  VN = 'vi-VN',
  EN = 'en-US',
}

export enum ROLE {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
}

export enum TOAST_TYPE {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}
