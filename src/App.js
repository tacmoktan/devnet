import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Routes from './components/routing/Routes';

import store from './store';
import { setAuthToken } from './redux/utils/setAuthToken';
import { loadUser } from './redux/actions/auth';

if (localStorage.token)
  setAuthToken(localStorage.token)

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Routes />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
