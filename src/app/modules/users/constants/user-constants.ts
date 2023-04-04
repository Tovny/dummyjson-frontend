import {
  EMPTY_ADDRESS,
  EMPTY_BANK,
  EMPTY_COMPANY,
} from 'src/app/constants/empty-items';
import { FormFieldTypes } from 'src/app/shared/models/form-field-types.model';
import { FormField, User } from 'src/app/types';

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

const addressControls: FormField[] = [
  { type: FormFieldTypes.TEXT, label: 'Address', control: 'address' },
  { type: FormFieldTypes.TEXT, label: 'City', control: 'city' },
  {
    type: FormFieldTypes.FIELDSET,
    label: 'Coordinates',
    control: 'coordinates',
    children: [
      { type: FormFieldTypes.NUMBER, label: 'Latitude', control: 'lat' },
      { type: FormFieldTypes.TEXT, label: 'Longitude', control: 'lng' },
    ],
  },
  { type: FormFieldTypes.TEXT, label: 'Postal code', control: 'postalCode' },
  { type: FormFieldTypes.TEXT, label: 'State', control: 'state' },
];

export const USER_FORM_FIELDS: FormField[] = [
  { type: FormFieldTypes.TEXT, label: 'First name', control: 'firstName' },
  { type: FormFieldTypes.TEXT, label: 'Last name', control: 'lastName' },
  { type: FormFieldTypes.EMAIL, label: 'E-Mail', control: 'email' },
  { type: FormFieldTypes.TEXT, label: 'Image', control: 'image' },
  { type: FormFieldTypes.NUMBER, label: 'Age', control: 'age', min: 0 },
  {
    type: FormFieldTypes.FIELDSET,
    label: 'Address',
    control: 'address',
    children: [...addressControls],
  },
  {
    type: FormFieldTypes.FIELDSET,
    label: 'Bank',
    control: 'bank',
    children: [
      {
        type: FormFieldTypes.TEXT,
        label: 'Card expiry',
        control: 'cardExpire',
      },
      { type: FormFieldTypes.TEXT, label: 'Card type', control: 'cardType' },
      { type: FormFieldTypes.TEXT, label: 'Currency', control: 'currency' },
      { type: FormFieldTypes.TEXT, label: 'IBAN', control: 'iban' },
    ],
  },
  {
    type: FormFieldTypes.FIELDSET,
    label: 'Company',
    control: 'company',
    children: [
      { type: FormFieldTypes.TEXT, label: 'Department', control: 'department' },
      { type: FormFieldTypes.TEXT, label: 'Name', control: 'name' },
      { type: FormFieldTypes.TEXT, label: 'Title', control: 'title' },
      {
        type: FormFieldTypes.FIELDSET,
        label: 'Address',
        control: 'address',
        children: [...addressControls],
      },
    ],
  },
  { type: FormFieldTypes.TEXT, label: 'Birth date', control: 'birthDate' },
  { type: FormFieldTypes.TEXT, label: 'Blood group', control: 'bloodGroup' },
  { type: FormFieldTypes.TEXT, label: 'Domain', control: 'domain' },
  { type: FormFieldTypes.TEXT, label: 'EIN', control: 'ein' },
  { type: FormFieldTypes.TEXT, label: 'Eye color', control: 'eyeColor' },
  {
    type: FormFieldTypes.SELECT,
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
    ],
    label: 'Gender',
    control: 'gender',
  },
  {
    type: FormFieldTypes.FIELDSET,
    label: 'Hair',
    control: 'hair',
    children: [
      { type: FormFieldTypes.TEXT, label: 'Color', control: 'color' },
      { type: FormFieldTypes.TEXT, label: 'Type', control: 'type' },
    ],
  },
  { type: FormFieldTypes.NUMBER, label: 'Height', control: 'height', min: 0 },
  { type: FormFieldTypes.TEXT, label: 'Weight', control: 'weight' },
  { type: FormFieldTypes.TEXT, label: 'IP', control: 'ip' },
  { type: FormFieldTypes.TEXT, label: 'MAC Address', control: 'macAddress' },
  { type: FormFieldTypes.TEXT, label: 'Maiden name', control: 'maidenName' },
  { type: FormFieldTypes.TEXT, label: 'Password', control: 'password' },
  { type: FormFieldTypes.TEXT, label: 'Phone', control: 'phone' },
  { type: FormFieldTypes.TEXT, label: 'SSN', control: 'ssn' },
  { type: FormFieldTypes.TEXT, label: 'University', control: 'university' },
  { type: FormFieldTypes.TEXT, label: 'User agent', control: 'userAgent' },
  { type: FormFieldTypes.TEXT, label: 'Username', control: 'username' },
];
