import React from 'react';
import constants from './constants.js';
import './Form.css';
import Input from '../Input/Input';
import Validation from '../../Helpers/Validation';

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
          result = value ? Validation.validatePresence(input_value) : true;
          break;
        case 'max_length':
          result = Validation.validateMaxLength(input_value, value);
          break;
        case 'regex':
          result = Validation.validateRegex(input_value, value);
          break;
        default: 
          result = false;
      }

      return result;
    });

    this.isValidated = this.isValidated && result;
    return result;
  }


  renderFormElements() {
    const formElements = this.state.input_elements.map((userInput, index) => {
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

    return formElements;
  }


  render() {
    return (
      <form className="Form" onSubmit={ this.formSubmissionHandler } ref={ this.formRef }>
        <div className="bg-success py-2">Registration Form</div>

        <div className="px-4 py-4">
          <div className="" >{
            this.renderFormElements()
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