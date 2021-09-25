import { ChangeEvent, EventHandler } from 'react';

import { languages } from '../constants';

import styles from './LanguageFilter.module.css';

interface Props {
  onChange: EventHandler<ChangeEvent>;
}

export function LanguageFilter({ onChange }: Props) {
  return (
    <label htmlFor="language-filter" className={styles.label}>
      Language:
      <select
        id="language-filter"
        className={styles.select}
        onChange={onChange}
      >
        <option>Any</option>
        {languages.map((language) => (
          <option value={language} key={language}>
            {language}
          </option>
        ))}
      </select>
    </label>
  );
}
