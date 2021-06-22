import React from "react";
import { connect } from "react-redux";
import { find } from "lodash";

import { contact as contactActionType } from "../../constants/action-types";

const { addContact } = contactActionType;

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const formFields = [{
		name: 'Firstname',
		key: 'firstname',
		validate: ['presence'],
		value: undefined,
		error: '',
	}, {
		name: 'Lastname',
		key: 'lastname',
		validate: ['presence'],
		value: undefined,
		error: '',
	}, {
		name: 'Email',
		key: 'email',
		validate: ['presence', 'email'],
		value: undefined,
		error: '',
}];

class AddContactForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSubmitted: false,
			formFields: [
				{
					name: 'Firstname',
					key: 'firstname',
					validate: ['presence'],
					value: undefined,
					error: '',
				}, 
				{
					name: 'Lastname',
					key: 'lastname',
					validate: ['presence'],
					value: undefined,
					error: '',
				}, 
				{
					name: 'Email',
					key: 'email',
					validate: ['presence', 'email'],
					value: undefined,
					error: '',
				}
			],
		};
		this.initialState = this.state;
	} 

	getContact = () => {
		const { isSubmitted, formFields } = this.state;

		if (!isSubmitted) {
			return null;
		}

		const firstname = formFields.find(field => field.key === "firstname")?.value;
		const lastname = formFields.find(field => field.key === "lastname")?.value;
		const email = formFields.find(field => field.key === "email")?.value;

		return {
			name: `${firstname} ${lastname}`,
			email: email,
			id: Date.now(),
		};
	}

	resetState = () => this.setState(this.initialState);

	handleSubmit = () => {
		this.props.createContact(this.getContact());
		this.resetState();
	}

	validateForm = (e) => {
		e.preventDefault();
		const formInputs = e.target;
		const { formFields } = this.state;
		let submitStatus = true;

		const newFormFields = formFields.map(({ key, value, error, validate, name }) => {
			const inputValue = formInputs[key].value;
			const errorMsg = this.validateFormInput(name, inputValue, validate);
			submitStatus = errorMsg ? false : submitStatus;

			return {
				name: name,
				key: key,
				value: inputValue,
				error: errorMsg ,
				validate: validate,
			};
		});

		this.setState({ isSubmitted: submitStatus, formFields: newFormFields }, () => {
			if (this.state.isSubmitted) {
				this.handleSubmit();
				e.target.reset()
			}
		});
	}

	validateFormInput = (fieldName, value, validations = []) => {
		let msg = '';
		validations.map((validation => {
			switch(validation) {
				case 'presence': 
					return msg = value ? '' : `${fieldName} is required!` ;
				case 'email':
					return msg = EMAIL_PATTERN.test(value) ? '' : 'Invalid email!' ;
				default: 
					return msg = '';
			}
		}))
		return msg;
	}

	render = () => {
		const { formFields } = this.state;
		return (
			<div className="col-6 px-4 py-4 text-start">
				<form className="" onSubmit={this.validateForm}>
					{
						formFields.map(({name, key, value, error}) => (
							<div className="form-floating mb-4" key={key}>
							  <input 
							  	autocomplete="off"
							  	type="text" 
							  	className={`form-control ${error ? 'is-invalid' : ''}`}
							  	id={key}
							  	name={key} 
							  	aria-describedby={key}
							  	onChange={this.validateFormInput}
							  />
							  <label htmlFor={key}>{name}</label>
							  { error && <div id={key} className="invalid-feedback">{error}</div> }
							</div>
						))
					}
					<button type="submit" className="btn btn-success">Submit</button>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => { 
	return {
		createContact: (contact) => dispatch({ type: addContact, payload: contact })
	};
};

export default connect(null, mapDispatchToProps)(AddContactForm);