import {
  EMPTY_ADDRESS,
  EMPTY_BANK,
  EMPTY_COMPANY,
} from 'src/app/constants/empty-items';
import { FormField, User } from 'src/app/types';

export const USER_FORM_FIELDS: FormField[] = [];

export const EMPTY_USER: Partial<User> = {
  address: EMPTY_ADDRESS,
  age: 0,
  bank: EMPTY_BANK,
  birthDate: '',
  bloodGroup: '',
  company: EMPTY_COMPANY,
  domain: '',
  ein: '',
  email: '',
  eyeColor: '',
  firstName: '',
  gender: '',
  hair: {
    color: '',
    type: '',
  },
  height: 0,
  image: '',
  ip: '',
  lastName: '',
  macAddress: '',
  maidenName: '',
  password: '',
  phone: '',
  ssn: '',
  university: '',
  userAgent: '',
  username: '',
  weight: 0,
};
