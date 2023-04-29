import FormCreateNewContact from '../formCreateNewContact';
import ListContacts from '../listContacts';
import Filter from '../filter';
import css from './App.module.css';

export default function App() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <FormCreateNewContact />
      <h2 className={css.title}>Contacts</h2>
      <Filter />
      <ListContacts />
    </div>
  );
}
