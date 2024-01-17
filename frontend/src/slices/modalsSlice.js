import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: false,
  register: false,
  advert: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      return {...state, ...action.payload}
    },
  },
});

export const { toggleModal } = modalsSlice.actions;

export default modalsSlice.reducer;