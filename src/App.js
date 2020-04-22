import React from 'react';
import NavWrapper from './components/NavWrapper/NavWrapper'
import {BrowserRouter, Route} from 'react-router-dom'
import ContactList from './components/ContactList/ContactList'
import Create from './components/Create/Create'
import Favorites from './components/Favorites/Favorites'

function App() {
  return (
      <BrowserRouter>
          <NavWrapper>
              <div className="App">
                  <Route path='/' exact component={ContactList}/>
                  <Route path='/create' component={Create}/>
                  <Route path='/favorites'  component={Favorites}/>
              </div>
          </NavWrapper>
      </BrowserRouter>
  );
}

export default App;
