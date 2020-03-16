import React from 'react';
import './App.scss';
import Nav from './Components/Nav'
import Dashboard from './Components/Dashboard'
import routes from './routes'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Nav />
          {routes}
        </div>
      </header>
    </div>
  );
}

export default App;
