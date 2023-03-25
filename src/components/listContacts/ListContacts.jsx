import PropTypes from 'prop-types';
import ContactItem from 'components/contactItem';
import NoContacts from 'components/noContacts';
import css from './ListContacts.module.css';

const ListContacts = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={css.list}>
      {contacts.length !== 0 ? (
        contacts.map(({ id, name, number }) => {
          return (
            <ContactItem
              key={id}
              id={id}
              name={name}
              number={number}
              onDeleteContact={onDeleteContact}
            />
          );
        })
      ) : (
        <NoContacts />
      )}
    </ul>
  );
};
export default ListContacts;

ListContacts.propTypes = {
  dataTransactions: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
