import React from 'react';
import './App.css';
import Nav from './Components/Nav'
import Auth from './Components/Auth'
import Dashboard from './Components/Dashboard'
import routes from './routes'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          {routes}
        </div>
      </header>
    </div>
  );
}

export default App;
