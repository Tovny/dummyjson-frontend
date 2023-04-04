import { ARRAY_CONTROL } from 'src/app/constants/constants';
import { FormFieldTypes } from 'src/app/shared/models/form-field-types.model';
import { FormField, Product } from 'src/app/types';

export const EMPTY_PRODUCT: Partial<Product> = {
  title: '',
  description: '',
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  brand: '',
  category: '',
  thumbnail: '',
  images: [],
};

export const PRODUCT_FORM_FIELDS: FormField[] = [
  { type: FormFieldTypes.TEXT, label: 'Title', control: 'title' },
  {
    type: FormFieldTypes.TEXTAREA,
    label: 'Description',
    control: 'description',
  },
  { type: FormFieldTypes.TEXT, label: 'Category', control: 'category' },
  { type: FormFieldTypes.TEXT, label: 'Brand', control: 'brand' },
  { type: FormFieldTypes.NUMBER, label: 'Price', control: 'price', min: 0 },
  {
    type: FormFieldTypes.NUMBER,
    label: 'Discount %',
    control: 'discountPercentage',
    min: 0,
    max: 100,
  },
  {
    type: FormFieldTypes.NUMBER,
    label: 'Rating',
    control: 'rating',
    min: 0,
    max: 100,
  },
  { type: FormFieldTypes.NUMBER, label: 'Stock', control: 'stock', min: 0 },
  { type: FormFieldTypes.TEXT, label: 'Thumbnail', control: 'thumbnail' },
  {
    type: FormFieldTypes.FIELDSET,
    label: 'Images',
    control: 'images',
    children: [
      {
        type: FormFieldTypes.TEXT,
        label: 'Image',
        control: ARRAY_CONTROL,
      },
    ],
  },
];
