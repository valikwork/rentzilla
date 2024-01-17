import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adverts: []
};

const advertsSlice = createSlice({
  name: 'adverts',
  initialState,
  reducers: {
    setAdverts: (state, action) => {
      state.adverts = action.payload;
    },
  },
});

export const { setAdverts } = advertsSlice.actions;

export default advertsSlice.reducer;