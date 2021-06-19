import React from "react";
import AddContactForm from './AddContactForm';
import ContactList from './ContactList';

class ContactManager extends React.Component {
	render = () => (
		<div className="container-fluid px-4 py-4">
			<AddContactForm />
			<ContactList />
		</div>
	);
}

export default ContactManager;