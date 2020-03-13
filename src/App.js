import React from 'react';
import './App.scss';
import Nav from './Components/Nav'
import Dashboard from './Components/Dashboard'
import routes from './routes'
import Footer from './Components/Footer'

function App() {
  return (
    <div className="App">
          <Nav />
          {routes}
          <Footer />
    </div>
  );
}

export default App;
