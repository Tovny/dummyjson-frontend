import { Address, User } from '../types';

const EMPTY_ADDRESS: Address = {
  address: '',
  city: '',
  coordinates: {
    lat: 0,
    lng: 0,
  },
  postalCode: '',
  state: '',
};

const EMPTY_BANK = {
  cardExpire: '',
  cardNumber: '',
  cardType: '',
  currency: '',
  iban: '',
};

const EMPTY_COMPANY = {
  address: EMPTY_ADDRESS,
  department: '',
  name: '',
  title: '',
};

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
  id: 0,
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
