### Demo

To see the app in action, check out: https://hejtful.github.io/superstar-repos/

### Installation

1. Clone the repository
2. Change to the repository directory
3. Run `yarn` to install dependencies
4. Run `yarn start` to start the dev server

### Scripts

#### `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `yarn test`

Launches the test runner in the interactive watch mode.

#### `yarn build`

Builds the app for production to the `build` folder.

### Architecture

The "features" architecture, recommended by Redux Toolkit, was used. Since I only recognized a single feature in the requirements, the app currently only has one feature directory.

If another feature was to be added, additional feature directories would be created. For example:

- Most active engineers on GitHub in the past week - `github` feature would be renamed to `githubRepos`, and the new feature would be `githubUsers`. The `githubApi` service would be moved outside of `features` and into `app` directory, as it would be clear that GitHub API would be the main API for the app.
- Most starred repos on GitLab - a new `gitlab` feature would be added, with its own `gitlabApi`.

### Persisting data

Since it was a requirement to persist starred repos in `localStorage`, I decided to persist the whole store instead, for two main reasons:

- Time - Persisting only a specific piece of state would take more time to implement.
- Scope of the app - with such a small app, persisting the whole state didn't seem like a big problem.

I decided to add a `localStorage` middleware because I didn't want to add these side-effects to the reducer.

Additionally, having starred repos saved in the `localStorage`, and not sent to the API, made me go for displaying only the repos, from the top 25 repos, that are starred. In order to show top 25 of the starred repos, I would have to poll the API for next pages until 25 starred repos are displayed, which could end up in hundreds of requests. Additionally, when a language filter is active and less than 25 repos of that language are starred, polling would go on until all the repos are fetched.

### Styling

In order to showcase working with CSS, I decided for CSS modules.

No naming conventions were used, because CSS modules are scoped by themselves, so it seemed like an overhead.

The app is responsive.

### Testing

Main feature requirements are tested with integration tests in `Github.spec.tsx`.

Unit tests are added for `localStorage` middleware, date utilities, store reducer and snapshot tests for UI components.

API calls are mocked by `msw` library in `src/test/` directory.

### Optimization

Since no performance issues arose (or were expected from such a small app), no optimization was done. If any performance issues were to arise, I would first consider:

- Memoizing `repos` in `Github.tsx` to prevent unnecessary renders when any of its dependencies change:

```typescript
// Current code
const repos = isStarredFilterActive
  ? allRepos?.filter((repo) => starredReposIds?.includes(repo.id))
  : allRepos;

// Memoized code
const repos = useMemo(() => {
  if (!isStarredFilterActive) return allRepos;
  return allRepos?.filter((repo) => starredReposIds?.includes(repo.id));
}, [isStarredFilterActive, allRepos, starredReposIds]);
```

- Memoizing the star/un-star button callbacks, also to prevent unnecessary rerenders (where `repoId` would be sent as an argument from the child component):

```typescript
// Current code
onStarButtonClick={() => dispatch(starRepo(repo.id))}

// Memoized code
const handleStarButtonClick = useCallback(
  (repoId) => {
    dispatch(starRepo(repoId));
  },
  [dispatch]
);
...
onStarButtonClick={handleStarButtonClick}
```

I would profile the app before and after implementing these optimizations, to check if it actually brought any improvement to the number and duration of renders.

### Improvements

With more time, I would like to have:

- Extracted `ReposList.tsx` component, to clean up `Github.tsx` from render logic and styles.
- Extracted `Banner.tsx` component, to clean up `Github.tsx` from static HTML and styles.
- Improved event handler typing in `Github.tsx` and added return value types in `app/util.ts`.
- Used `user-event` instead of `fireEvent` for tests with `react-testing-library`.
- Used an endpoint to fetch a list of programming languages, instead of hard-coding only a small number.
