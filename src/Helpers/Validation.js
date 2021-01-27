
const URL_PATTERN   = /^(https?:\/\/)?(w{3})?\w+([\-\.]{1}\w+)*\.[a-z]{2,5}(:\d{1,5})?(\/.*)?$/;
const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;


class Validation {

  static validatePresence = (input_value) => {
    let result = false;

    switch(typeof(input_value)) {
      case 'number':
        result = true;
        break;
      case 'string':
        result = input_value.trim() !== '';
        break;
      case 'boolean':
        result = true;
        break;
      case 'object':
        result = (input_value === null) ? false : !!Object.keys(input_value).length;
        break;
      default:
        result = false;
    }

    return result;
  }


  static validateMaxLength = (input_value, max_length) => {
    if (typeof(input_value) === 'string') {
      return input_value.length <= max_length;
    }

    return false;
  }

  static validateRegex = (input_value, regex_pattern) => {
    let result = false;

    switch(regex_pattern) {
      case 'email':
        result = EMAIL_PATTERN.test(input_value);
        break;
      case 'url':
        result = URL_PATTERN.test(input_value);
        break;
      default:
        result = false;
    }

    return result;
  }
}


export default Validation;