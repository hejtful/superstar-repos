import githubReducer, {
  GithubState,
  starRepo,
  unStarRepo,
} from './githubSlice';

describe('github reducer', () => {
  const initialState: GithubState = {
    starred: [1, 2],
  };

  it('should handle initial state', () => {
    expect(githubReducer(undefined, { type: 'unknown' })).toEqual({
      starred: [],
    });
  });

  it('should handle starring of a repo', () => {
    const actual = githubReducer(initialState, starRepo(3));
    expect(actual.starred).toEqual([1, 2, 3]);
  });

  it('should handle un-starring of a repo', () => {
    const actual = githubReducer(initialState, unStarRepo(1));
    expect(actual.starred).toEqual([2]);
  });
});
