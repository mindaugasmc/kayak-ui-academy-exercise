import { hot } from 'react-hot-loader/root';

import React from 'react';

import Autocomplete from '../autocomplete';

import styles from './app.css';

const App = () => (
  <div className={styles.container}>
    {/* <div className={styles.title}>Kayak UI Acadamy exercise</div> */}
    <Autocomplete />
  </div>
);

export default hot(App);
