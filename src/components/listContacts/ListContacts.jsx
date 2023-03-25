import ContactItem from 'components/contactItem';
const ListContacts = ({ contacts, onDeleteContact }) => {
  return (
    <ul>
      {contacts &&
        contacts.map(({ id, name, number }) => {
          return (
            <li key={id}>
              <ContactItem
                id={id}
                name={name}
                number={number}
                onDeleteContact={onDeleteContact}
              />
            </li>
          );
        })}
    </ul>
  );
};
export default ListContacts;
