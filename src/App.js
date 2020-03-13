import React from 'react';
import './App.scss';
import Nav from './Components/Nav'
import Dashboard from './Components/Dashboard'
import routes from './routes'

function App() {
  return (
    <div className="App">
          <Nav />
          {routes}
    </div>
  );
}

export default App;
