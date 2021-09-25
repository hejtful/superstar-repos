import { Middleware } from 'redux';

export const APPLICATION_STATE_KEY = 'applicationState';

export const localStorageMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action);

    localStorage.setItem(APPLICATION_STATE_KEY, JSON.stringify(getState()));

    return result;
  };

export const hydrateStore = () => {
  const persistedState = localStorage.getItem(APPLICATION_STATE_KEY);

  if (persistedState !== null) {
    return JSON.parse(persistedState);
  }
};
