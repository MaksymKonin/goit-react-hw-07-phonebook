import ContactItem from 'components/contactItem';
import NoContacts from 'components/noContacts';
import { useSelector } from 'react-redux';

import css from './ListContacts.module.css';

const ListContacts = () => {
  const { contacts } = useSelector(state => state.phoneBook);
  const { filter } = useSelector(state => state.phoneBook);

  const filterContacts = () => {
    return contacts.filter(contact => {
      let normalizedName = contact.name.toUpperCase();
      return normalizedName.includes(filter.toUpperCase());
    });
  };

  const filteredContacts = filter === '' ? contacts : filterContacts();

  return (
    <ul className={css.list}>
      {filteredContacts.length !== 0 ? (
        filteredContacts.map(({ id, name, number }) => {
          return <ContactItem key={id} id={id} name={name} number={number} />;
        })
      ) : (
        <NoContacts />
      )}
    </ul>
  );
};
export default ListContacts;
