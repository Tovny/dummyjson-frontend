import {
  FormArray,
  FormControl,
  FormGroup,
  UntypedFormArray,
} from '@angular/forms';

export const generateForm = (item: Record<string, any>): FormGroup => {
  const form = new FormGroup({});
  Object.keys(item).forEach(key => buildForm(form, item[key], key));

  return form;
};

const buildForm = (
  form: FormGroup | FormArray,
  item: any,
  key: string
): void => {
  if (Array.isArray(item)) {
    const array = new UntypedFormArray([]);
    addControl(form, array, key);
    return item.forEach(curr => buildForm(array, curr, ''));
  }

  if (typeof item === 'object') {
    const group = new FormGroup({});
    if ('push' in form) {
      form.push(group);
    } else {
      form.addControl(key, group);
    }
    return Object.keys(item).forEach(key => buildForm(group, item[key], key));
  }

  const control = new FormControl(item);
  addControl(form, control, key);
};

const addControl = (
  formElt: FormGroup | FormArray,
  control: FormGroup | FormArray | FormControl,
  key = ''
) => {
  if ('push' in formElt) {
    formElt.push(control);
  } else {
    formElt.addControl(key, control);
  }
};
