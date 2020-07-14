import React from 'react';
import styles from './App.module.scss';

const App: React.FC = () => (
  <div className={styles.container}>
    <header>
      <h1 className="visually-hidden">Карта парка ДГТУ</h1>
    </header>
    <main className={styles.main}>
      <div className="container-md">Works</div>
    </main>
    <footer />
  </div>
);

export default App;
