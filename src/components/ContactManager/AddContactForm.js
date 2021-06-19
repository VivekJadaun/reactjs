import React from "react";

class AddContactForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formFields: [
				{
					name: 'Firstname',
					key: 'firstname',
					validate: ['presence'],
					value: null,
					error: '',
				},
				{
					name: 'Lastname',
					key: 'lastname',
					validate: ['presence'],
					value: null,
					error: '',
				},
				{
					name: 'Email',
					key: 'email',
					validate: ['presence', 'email'],
					value: null,
					error: '',
				},
			]
		};
	} 

	validateForm = (e) => {
		const formInputs = e.target;
	}

	render = () => {
		const { formFields } = this.state;
		return (
			<div className="col-6">
				<form className="" onSubmit={this.validateForm}>
					{
						formFields.map(({name, key}) => (
							<div class="form-floating mb-2" key={key}>
							  <input type="text" class="form-control" id={key} name={key} />
							  <label for={key}>{name}</label>
							</div>
						))
					}
					<button type="submit" class="btn btn-success">Submit</button>
				</form>
			</div>
		);
	}
}

export default AddContactForm;