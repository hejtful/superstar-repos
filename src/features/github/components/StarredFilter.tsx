import { ChangeEvent, EventHandler } from 'react';

import styles from './StarredFilter.module.css';

interface Props {
  value: boolean;
  onChange: EventHandler<ChangeEvent>;
}

export function StarredFilter({ value, onChange }: Props) {
  return (
    <label className={styles.switch} data-testid="starred-filter">
      <span className={styles.labelText}>Starred:</span>
      <input
        type="checkbox"
        className={styles.input}
        checked={value}
        onChange={onChange}
      />
      <span className={styles.slider}></span>
    </label>
  );
}
