import React from 'react';
import './App.css';
import { Layout } from './features/layout';
import { DataTable } from './features/dataTable';

function App() {
  return (
    <div className="App">
          <Layout>
            <DataTable></DataTable>
          </Layout>      
    </div>
  );
}

export default App;
