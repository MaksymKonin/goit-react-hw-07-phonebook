import { Component } from 'react';
import { nanoid } from 'nanoid';
import FormCreateNewContact from '../formCreateNewContact';
import ListContacts from '../listContacts';
import Filter from '../filter';
import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmithandle = data => {
    this.setState(prev => {
      return this.createContact(data)
        ? {
            contacts: [...prev.contacts, this.createContact(data)],
          }
        : { contacts: prev.contacts };
    });
  };

  createContact = ({ name, number }) => {
    const { contacts } = this.state;
    if (contacts.find(contact => contact.name === name)) {
      return alert(`${name} is already in contacts`);
    } else {
      return { id: nanoid(), name, number };
    }
  };

  handleChangeFilter = e => {
    return this.setState({ filter: e.target.value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    if (filter)
      return contacts.filter(contact => {
        let normalizedName = contact.name.toUpperCase();
        return normalizedName.includes(filter.toUpperCase());
      });
    return contacts;
  };

  deleteContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <FormCreateNewContact onSubmit={this.formSubmithandle} />
        <h2 className={css.title}>Contacts</h2>
        <Filter filter={filter} onChangeFilter={this.handleChangeFilter} />
        <ListContacts
          contacts={this.filterContacts()}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
