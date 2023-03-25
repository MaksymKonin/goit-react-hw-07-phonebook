import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ filter, onChangeFilter }) => {
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

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};
