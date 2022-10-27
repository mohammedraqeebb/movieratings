import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const INITIAL_USER_STATE = {
  id: '',
  name: '',
  email: '',
  isSignedIn: false
};
const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_USER_STATE,
  reducers: {
    signin(state, action) {
      {
        const { email, id, name } = action.payload;
        state.email = email;
        state.id = id;
        state.name = name;
        state.isSignedIn = true;
      }
    },
    signout(state, action) {
      state.email = '';
      state.id = '';
      state.name = '';
      state.isSignedIn = false;
    },
  },
});

export const { signin, signout } = userSlice.actions;
export default userSlice.reducer;
