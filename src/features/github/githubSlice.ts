import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface GithubState {
  starred: number[];
}

const initialState: GithubState = {
  starred: [],
};

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    starRepo: (state, action: PayloadAction<number>) => {
      state.starred.push(action.payload);
    },

    unStarRepo: (state, action: PayloadAction<number>) => {
      state.starred = state.starred.filter((id) => id !== action.payload);
    },
  },
});

export const { starRepo, unStarRepo } = githubSlice.actions;

export const selectStarredReposIds = (state: RootState) => state.github.starred;

export default githubSlice.reducer;
