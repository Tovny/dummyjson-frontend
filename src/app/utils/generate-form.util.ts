import {
  FormArray,
  FormControl,
  FormGroup,
  UntypedFormArray,
} from '@angular/forms';
import { GeneratedForm } from '../types';

export const generateForm = <T extends object>(item: T): GeneratedForm<T> => {
  const form = new FormGroup({}) as unknown as GeneratedForm<T>;
  Object.keys(item).forEach(key => buildForm(form, item[key as keyof T], key));

  return form;
};

const buildForm = (
  form: FormGroup | FormArray,
  item: unknown,
  key: string
): void => {
  if (Array.isArray(item)) {
    const array = new UntypedFormArray([]);
    addControl(form, array, key);
    return item.forEach(curr => buildForm(array, curr, ''));
  }

  if (item && typeof item === 'object') {
    const group = new FormGroup({});
    addControl(form, group, key);

    return Object.keys(item).forEach(key =>
      buildForm(group, item[key as keyof unknown], key)
    );
  }

  const control = new FormControl(item);
  addControl(form, control, key);
};

const addControl = (
  formElt: FormGroup | FormArray,
  control: FormGroup | FormArray | FormControl,
  key = ''
) => {
  if (formElt instanceof FormArray) {
    formElt.push(control);
  } else {
    formElt.addControl(key, control);
  }
};
