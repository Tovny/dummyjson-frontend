import { Address } from '../types';

export const EMPTY_ADDRESS: Address = {
  address: '',
  city: '',
  coordinates: {
    lat: 0,
    lng: 0,
  },
  postalCode: '',
  state: '',
};

export const EMPTY_BANK = {
  cardExpire: '',
  cardNumber: '',
  cardType: '',
  currency: '',
  iban: '',
};

export const EMPTY_COMPANY = {
  address: EMPTY_ADDRESS,
  department: '',
  name: '',
  title: '',
};
