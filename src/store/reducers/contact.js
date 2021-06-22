import { contact as contactActionType } from "../../constants/action-types";

const { addContact, removeContact } = contactActionType;

const DEFAULT_STATE = {
  contacts: [],
};

const contact = (state = DEFAULT_STATE, { type, payload }) => {
  if (type == addContact) {
    const { contacts } = state;
    state = { contacts: contacts.concat(payload) };
  }

  if (type == removeContact) {
    const { contacts } = state;
    const filteredContacts = contacts.filter(contact => contact.id !== payload.id);
    state = { filteredContacts };
  }

  return state;
};

export default contact;
