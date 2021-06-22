import React, { useState } from "react";
import { connect } from "react-redux";


const ContactList = ({ contacts }) => {
	const [searchKeyword, updateSearchKeyword] = useState('');

	const updateSearchTerm = (e) => {
		const searchTerm = e.target.value;
		updateSearchKeyword(searchTerm);
	};

	const filteredContacts = contacts.filter(contact => {
		return contact?.name?.includes(searchKeyword) 
			|| contact?.email?.includes(searchKeyword);
	});

	return (
		<div className="col-6 my-2">
			<div className="d-flex my-2 mx-2">
				<div className="col-4 text-start">
					<h3>Contacts:</h3>
				</div>	
				<div className="col-8">
					<input type="text" className="form-control" placeholder="search contacts" onChange={updateSearchTerm}/>
				</div>	
			</div>
			<ul className="list-group" style={{maxHeight: "740px", overflowY: "auto"}}>
				{
					filteredContacts?.map(({name, email, id}) => (
						<li className="list-group-item d-flex justify-content-between" key={id}>
							<div className="col-9">
								<div className="text-start">Name: { name }</div>
								<div className="text-start">Email: { email }</div>
							</div>
							<div className="col-3 mt-1">
								<button className="btn btn-danger">DELETE</button>
							</div>
						</li>
					))
				}
			</ul>
		</div>
	);
}

const mapStateToProps = ({ contact }) => {
	return {
		contacts: contact.contacts
	}
};

export default connect(mapStateToProps)(ContactList);