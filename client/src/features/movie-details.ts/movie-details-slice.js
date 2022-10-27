import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export const INITIAL_MOVIE_STATE = {
  name: '',
  yearOfRelease: '',
  plot: '',
  poster: '',
  actors: [],
  producer: { id: '', name: '' },
};
const movieSlice = createSlice({
  name: 'user',
  initialState: INITIAL_MOVIE_STATE,
  reducers: {
    handleChangeMovie(state) { },
    logout(state) { },
  },
});

export const { } = movieSlice.actions;
export default movieSlice.reducer;
