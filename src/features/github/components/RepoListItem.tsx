import { MouseEvent, EventHandler } from 'react';
import { Repository } from '../githubTypes';
import styles from './RepoListItem.module.css';

interface Props {
  repo: Repository;
  isStarred: boolean;
  onStarButtonClick: EventHandler<MouseEvent>;
  onUnStarButtonClick: EventHandler<MouseEvent>;
}

export function RepoListItem({
  repo,
  isStarred,
  onStarButtonClick,
  onUnStarButtonClick,
}: Props) {
  return (
    <article className={styles.wrapper} data-testid="repo-list-item">
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>
          <a href={repo.html_url} className={styles.link}>
            {repo.owner.login}
            <span className={styles.repoName}> / {repo.name}</span>
          </a>
        </h1>

        {isStarred ? (
          <button
            className={styles.button}
            type="button"
            onClick={onUnStarButtonClick}
          >
            Un-star
          </button>
        ) : (
          <button
            className={styles.button}
            type="button"
            onClick={onStarButtonClick}
          >
            Star
          </button>
        )}
      </div>

      <p className={styles.description}>{repo.description}</p>

      <div className={styles.details}>
        <span>Language: {repo.language || 'Unknown'}</span>
        <span>Stars: {repo.stargazers_count}</span>
      </div>
    </article>
  );
}
