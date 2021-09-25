import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';

import { localStorageMiddleware } from './middleware/localStorageMiddleware';
import githubReducer from '../features/github/githubSlice';
import { githubApi } from '../features/github/githubApi';

const rootReducer = combineReducers({
  github: githubReducer,
  [githubApi.reducerPath]: githubApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(localStorageMiddleware)
        .concat(githubApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
