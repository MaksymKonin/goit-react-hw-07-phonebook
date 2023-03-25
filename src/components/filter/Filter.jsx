const Filter = ({ filter, onChangeFilter }) => {
  return (
    <>
      <label>
        Find contacts by name
        <input
          name="filter"
          type="text"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={filter}
          onChange={onChangeFilter}
        />
      </label>
    </>
  );
};
export default Filter;
