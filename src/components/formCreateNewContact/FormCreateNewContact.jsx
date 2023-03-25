import { Component } from 'react';
import css from './FormCreateNewContact.module.css';
class FormCreateNewContact extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    return this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    const { onSubmit } = this.props;
    e.preventDefault();
    onSubmit(this.state);
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
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
            onChange={this.handleChange}
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
            onChange={this.handleChange}
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
}
export default FormCreateNewContact;
