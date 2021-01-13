import React from 'react';
import constants from './constants.js';
import './Form.css';
import Input from '../Input/Input';

const URL_PATTERN   = /^(https?:\/\/)?(w{3})?\w+([\-\.]{1}\w+)*\.[a-z]{2,5}(:\d{1,5})?(\/.*)?$/;
const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...constants,
    }

    this.isValidated = true;
    this.formRef     = React.createRef();
  }

  formSubmissionHandler = (event) => {
    event.preventDefault();

    this.isValidated = true;
    let newState     = JSON.parse(JSON.stringify(this.state));

    this.state.input_elements.map(( input_element ) => {
      const input_value = this.formRef.current[input_element.id].value;
      let validation_result = true;

      if (input_element.validations) {
        validation_result = this.validateInput(input_element.validations, input_value);
        newState.input_elements.find( element => element.id === input_element.id ).is_valid = validation_result;;
      }

      return validation_result;
    });

    console.log(this.isValidated);

    if (!this.isValidated) {
      this.setState(newState);
    } else {
      window.alert('Form submitted successfully');
      this.resetForm();
    }
  }


  resetForm = () => {
    this.formRef.current.reset();
    this.isValidated = true;
    this.setState({...constants});
  }

  validateInput = (validations, input_value = '') => {
    let result = false;

    Object.entries(validations).every(([key, value]) => {
      switch(key) {
        case 'required':
          result = value ? this.validatePresence(input_value) : true;
          break;
        case 'max_length':
          result = this.validateMaxLength(input_value, value);
          break;
        case 'regex':
          result = this.validateRegex(input_value, value);
          break;
        default: 
          result = false;
      }

      return result;
    });

    this.isValidated = this.isValidated && result;
    return result;
  }


  validatePresence = (input_value) => {
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


  validateMaxLength = (input_value, max_length) => {
    if (typeof(input_value) === 'string') {
      return input_value.length <= max_length;
    }

    return false;
  }

  validateRegex = (input_value, regex_pattern) => {
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


  render() {
    return (
      <form className="Form" onSubmit={ this.formSubmissionHandler } ref={ this.formRef }>
        <div className="bg-success py-2">Registration Form</div>

        <div className="px-4 py-4">
          <div className="" >{
            this.state.input_elements.map((userInput, index) => {
              return <Input 
                key={ userInput.id } 
                id={ userInput.id } 
                name={ userInput.id } 
                type={ userInput.type } 
                label={ userInput.label } 
                hint={ userInput.hint } 
                attributes={ userInput.attributes } 
                error_msg= { userInput.error_msg }
                is_valid={ userInput.is_valid }
              ></Input>
            })
          }</div>

          <div>
            <p className="fw-bold">Your password will be mailed to you</p>
            <button type="submit" className="btn btn-success">Go</button>
          </div>
        </div>

      </form>
    );
  }
}

export default Form;