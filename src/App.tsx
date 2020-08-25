import React from 'react';
import './App.css';
import { Layout } from './features/layout';
import { Orders } from './features/orders';

function App() {
  return (
    <div className="App">
          <Layout>
            <Orders></Orders>
          </Layout>      
    </div>
  );
}

export default App;
