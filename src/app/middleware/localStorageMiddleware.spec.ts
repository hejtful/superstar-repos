import {
  APPLICATION_STATE_KEY,
  hydrateStore,
  localStorageMiddleware,
} from './localStorageMiddleware';

const initialState = {
  github: {
    starred: [],
  },
};

const create = () => {
  const store = {
    getState: jest.fn(() => initialState),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  const invoke = (action: any) => localStorageMiddleware(store)(next)(action);

  return { store, next, invoke };
};

describe('localStorageMiddleware', () => {
  it('should save application state to localStorage', () => {
    jest.spyOn(window.localStorage.__proto__, 'setItem');

    const { next, invoke } = create();

    const action = jest.fn();

    invoke(action);

    expect(next).toBeCalledWith(action);

    expect(localStorage.setItem).toBeCalledWith(
      APPLICATION_STATE_KEY,
      JSON.stringify(initialState)
    );
  });
});

describe('hydrateStore', () => {
  it('should look into localStorage for persisted application state', () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem');

    hydrateStore();

    expect(localStorage.getItem).toBeCalledWith(APPLICATION_STATE_KEY);
  });

  it('should exit if there is no persisted application state in localStorage', () => {
    window.localStorage.__proto__.getItem = jest
      .fn()
      .mockImplementationOnce(() => null);

    expect(hydrateStore()).toBeUndefined();
  });

  it('should return persisted application state from localStorage', () => {
    window.localStorage.__proto__.getItem = jest
      .fn()
      .mockImplementationOnce(() => JSON.stringify(initialState));

    expect(hydrateStore()).toEqual(initialState);
  });
});
