import { useState } from 'react';

import { getLastWeekQueryString } from '../../app/util';
import { useGetReposQuery } from './githubApi';
import { LanguageFilter, RepoListItem } from './components/';

import styles from './Github.module.css';

const now = new Date();
const created = getLastWeekQueryString(now);

export const errorMessage = 'Something went wrong. Please try again later';
export const loadingMessage = 'Loading...';

export function Github() {
  const [language, setLanguage] = useState<string | null>(null);
  const {
    data: repos,
    error,
    isLoading,
  } = useGetReposQuery({ created, language });

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
                  isStarred={false}
                  onStarButtonClick={() => ({})}
                  onUnStarButtonClick={() => ({})}
                />
              ))
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
