import React from 'react';
import Map from '../Map';
import styles from './App.module.scss';

const App: React.FC = () => (
  <div className={styles.container}>
    <header>
      <h1 className="visually-hidden">Карта парка ДГТУ</h1>
    </header>
    <main className={styles.main}>
      <Map />
    </main>
    <footer />
  </div>
);

export default App;
