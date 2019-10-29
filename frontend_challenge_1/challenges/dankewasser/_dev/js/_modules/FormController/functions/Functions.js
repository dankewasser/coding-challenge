/**
 * バリデーション
 * @param value
 * @param type
 * @returns {boolean}
 */
export function validate(value, type = '') {
  let isValid = false;

  switch (type) {
    case 'text':
      if (value !== '') isValid = true;
      break;
    case 'email':
      if (value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        isValid = true;
      }
      break;
    default:
      isValid = true;
  }

  return isValid;
}
