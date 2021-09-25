import { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getLastWeekQueryString } from '../../app/util';
import { selectStarredReposIds, starRepo, unStarRepo } from './githubSlice';
import { useGetReposQuery } from './githubApi';
import { languagesPerPage } from './constants';
import { LanguageFilter, StarredFilter, RepoListItem } from './components/';

import styles from './Github.module.css';

const now = new Date();
const created = getLastWeekQueryString(now);

export const errorMessage = 'Something went wrong. Please try again later';
export const loadingMessage = 'Loading...';

export function Github() {
  const [language, setLanguage] = useState<string | null>(null);
  const [isStarredFilterActive, setIsStarredFilterActive] = useState(false);
  const {
    data: allRepos,
    error,
    isLoading,
  } = useGetReposQuery({ created, language });
  const starredReposIds = useAppSelector(selectStarredReposIds);
  const dispatch = useAppDispatch();

  const repos = isStarredFilterActive
    ? allRepos?.filter((repo) => starredReposIds?.includes(repo.id))
    : allRepos;

  return (
    <main className={styles.main}>
      <div className={styles.banner}>
        <h1 className={styles.bannerTitle}>Superstar Repos</h1>
        <p className={styles.bannerDescription}>
          See the repositories that the GitHub community starred the most in the
          previous week
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.actions}>
            <LanguageFilter
              onChange={(event) =>
                setLanguage((event.target as HTMLSelectElement).value)
              }
            />

            <StarredFilter
              value={isStarredFilterActive}
              onChange={(event) =>
                setIsStarredFilterActive(
                  (event.target as HTMLInputElement).checked
                )
              }
            />
          </div>

          <div>
            {error ? (
              // Error message
              <div className={styles.statusMessage}>{errorMessage}</div>
            ) : isLoading ? (
              // Loading message
              <div className={styles.statusMessage}>{loadingMessage}</div>
            ) : repos?.length ? (
              // Loaded repos
              repos.map((repo) => (
                <RepoListItem
                  key={repo.id}
                  repo={repo}
                  isStarred={starredReposIds?.includes(repo.id)}
                  onStarButtonClick={() => dispatch(starRepo(repo.id))}
                  onUnStarButtonClick={() => dispatch(unStarRepo(repo.id))}
                />
              ))
            ) : allRepos?.length ? (
              // No starred repos message
              <div className={styles.statusMessage}>
                You did not star any of the top {languagesPerPage} {language}{' '}
                repos.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
