import React from 'react';
import Layout from './components/Layout/layout';
import './App.css';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder/>
      </Layout>
    </div>
  );
}

export default App;
