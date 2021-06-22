import React from "react";
import AddContactForm from './add-contact-form';
import ContactList from './contact-list';

class ContactManager extends React.Component {
	render = () => (
		<div className="container-fluid row">
			<AddContactForm />
			<ContactList />
		</div>
	);
}

export default ContactManager;