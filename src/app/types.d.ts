import { ApiEndpoints } from './shared/models/ApiEndpoints.model';
import { accounts as Accounts } from 'google-one-tap';

declare var window: Window & {
  google: { accounts: Accounts };
};

export interface Product {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export interface User {
  address: Address;
  age: number;
  bank: Bank;
  birthDate: string;
  bloodGroup: string;
  company: Company;
  domain: string;
  ein: string;
  email: string;
  eyeColor: string;
  firstName: string;
  gender: string;
  hair: {
    color: string;
    type: string;
  };
  height: number;
  id: number;
  image: string;
  ip: string;
  lastName: string;
  macAddress: string;
  maidenName: string;
  password: string;
  phone: string;
  ssn: string;
  university: string;
  userAgent: string;
  username: string;
  weight: number;
}

interface Address {
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  postalCode: string;
  state: string;
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface Company {
  address: Address;
  department: string;
  name: string;
  title: string;
}

export interface Cart {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export type Response<T extends User | Product | Cart> = {
  [k in ApiEndpoints]?: T[];
} & {
  limit: number;
  skip: number;
  total: number;
};
