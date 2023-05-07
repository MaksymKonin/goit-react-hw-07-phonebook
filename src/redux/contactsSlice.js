import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './operations';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

const arrThunks = [fetchContacts, addContact, deleteContact];

const getActions = type => isAnyOf(...arrThunks.map(el => el[type]));

const handlePending = state => {
  state.contacts.isLoading = true;
};

const handleRejected = (state, { payload }) => {
  state.contacts.isLoading = false;
  state.contacts.error = payload;
};

const handleFulfilled = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = null;
};

const fetchContactsFulfilled = (state, { payload }) => {
  state.contacts.items = payload;
};

const addContactFulfilled = (state, { payload }) => {
  state.contacts.items.push(payload.contact);
};

const deleteContactFulfilled = (state, { payload }) => {
  const index = state.contacts.items.findIndex(item => item.id === payload.id);
  state.contacts.items.splice(index, 1);
};

const contactsSlice = createSlice({
  name: 'phoneBook',
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    const { PENDING, FULFILLED, REJECTED } = STATUS;
    builder
      .addCase(fetchContacts.fulfilled, fetchContactsFulfilled)
      .addCase(addContact.fulfilled, addContactFulfilled)
      .addCase(deleteContact.fulfilled, deleteContactFulfilled)
      .addMatcher(getActions(PENDING), handlePending)
      .addMatcher(getActions(REJECTED), handleRejected)
      .addMatcher(getActions(FULFILLED), handleFulfilled);
  },
});
export const contactsReducer = contactsSlice.reducer;
export const { updateFilter } = contactsSlice.actions;
