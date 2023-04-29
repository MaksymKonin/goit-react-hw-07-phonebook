import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import css from './FormCreateNewContact.module.css';
import { addContact } from 'redux/slice';

export default function FormCreateNewContact() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const dispatch = useDispatch();
  const { contacts } = useSelector(state => state.phoneBook);

  const handleSubmit = e => {
    e.preventDefault();
    const newContact = createContact(name, number);
    if (newContact) dispatch(addContact(newContact));
    setName('');
    setNumber('');
  };

  const createContact = (name, number) => {
    if (contacts?.find(contact => contact.name === name)) {
      return alert(`${name} is already in contacts`);
    } else {
      return { id: nanoid(), name, number };
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div>
        <label htmlFor="name" className={css.label}>
          Name{' '}
        </label>
        <input
          className={css.input}
          id="name"
          name="name"
          type="text"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="number" className={css.label}>
          Number
        </label>
        <input
          className={css.input}
          id="number"
          name="number"
          type="tel"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className={css['btn-form']}
        disabled={!name || !number}
      >
        Add contact
      </button>
    </form>
  );
}
