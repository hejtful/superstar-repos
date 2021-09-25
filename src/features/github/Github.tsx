import { getLastWeekQueryString } from '../../app/util';
import { useGetReposQuery } from './githubApi';

const now = new Date();
const created = getLastWeekQueryString(now);

export const errorMessage = 'Something went wrong. Please try again later';
export const loadingMessage = 'Loading...';

export function Github() {
  const {
    data: repos,
    error,
    isLoading,
  } = useGetReposQuery({ created, language: null });

  return (
    <div>
      {error ? (
        // Error message
        <>{errorMessage}</>
      ) : isLoading ? (
        // Loading message
        <>{loadingMessage}</>
      ) : repos?.length ? (
        // Loaded repos
        repos.map((repo) => (
          <div key={repo.id} data-testid="repo-list-item">
            {repo.name}
          </div>
        ))
      ) : null}
    </div>
  );
}
