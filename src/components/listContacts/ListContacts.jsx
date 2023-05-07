import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactItem from 'components/contactItem';
import NoContacts from 'components/noContacts';
import { fetchContacts } from 'redux/operations';
import { getContacts, getFilter } from 'redux/select';

import css from './ListContacts.module.css';

const ListContacts = () => {
  const { items } = useSelector(getContacts);
  const { filter } = useSelector(getFilter);
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filterContacts = () => {
    return items.filter(contact => {
      let normalizedName = contact.name.toUpperCase();
      return normalizedName.includes(filter.toUpperCase());
    });
  };

  const filteredContacts = filter === '' ? items : filterContacts();

  const Status = () => {
    if (isLoading) return isLoading;
    if (error) return error;
    if (filteredContacts.length !== 0) return 'Contacts';
    else return 'NoContacts';
  };

  return (
    <ul className={css.list}>
      {Status() === isLoading && <b>Loading...</b>}
      {Status() === error && (
        <b>An error occurred - please reload the page or try again later</b>
      )}
      {Status() === 'Contacts' &&
        filteredContacts.map(({ id, name, phone }) => {
          return <ContactItem key={id} id={id} name={name} phone={phone} />;
        })}
      {Status() === 'NoContacts' && <NoContacts />}
    </ul>
  );
};
export default ListContacts;
