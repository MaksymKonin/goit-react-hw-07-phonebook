import { useState } from 'react';
import { nanoid } from 'nanoid';
import useLocalStorage from 'hooks/useLocalStorage';
import FormCreateNewContact from '../formCreateNewContact';
import ListContacts from '../listContacts';
import Filter from '../filter';
import css from './App.module.css';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', '');
  const [filter, setFilter] = useState('');

  const formSubmithandle = data => {
    setContacts(prev => {
      return createContact(data) ? [...prev, createContact(data)] : { prev };
    });
  };

  const createContact = ({ name, number }) => {
    if (contacts.find(contact => contact.name === name)) {
      return alert(`${name} is already in contacts`);
    } else {
      return { id: nanoid(), name, number };
    }
  };

  const handleChangeFilter = e => {
    return setFilter(e.target.value);
  };

  const filterContacts = () => {
    if (filter)
      return contacts.filter(contact => {
        let normalizedName = contact.name.toUpperCase();
        return normalizedName.includes(filter.toUpperCase());
      });
    return contacts;
  };

  const deleteContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <FormCreateNewContact onSubmit={formSubmithandle} />
      <h2 className={css.title}>Contacts</h2>
      <Filter filter={filter} onChangeFilter={handleChangeFilter} />
      <ListContacts
        contacts={filterContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
