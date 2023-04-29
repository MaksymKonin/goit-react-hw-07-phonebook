import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from 'redux/slice';

import css from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector(state => state.phoneBook);

  const onChangeFilter = e => {
    dispatch(updateFilter(e.target.value));
  };

  return (
    <div>
      <label htmlFor="filter" className={css.label}>
        Find contacts by name
      </label>
      <input
        id="filter"
        className={css.input}
        name="filter"
        type="text"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={filter}
        onChange={onChangeFilter}
      />
    </div>
  );
};
export default Filter;
