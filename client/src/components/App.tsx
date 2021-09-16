import { globals } from '../state';
import { useEffect } from 'react';

import '../style.css';

import { Footer } from './Footer';
import { Main } from './Main';
import { Navbar } from './Navbar';
import { client } from '../client';

export const App = (): JSX.Element => {
  const setMode: () => void = globals(s => s.setMode);

  useEffect(() => {
    setMode();
  });

  return <div className="page">
    <Navbar />

    <Main />

    <Footer />
  </div> 
}