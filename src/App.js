import React, { useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Landing from './components/layouts/Landing';
import Routes from './components/routing/Routes';

import store from './store';
import { setAuthToken } from './redux/utils/setAuthToken';
import { loadUser } from './redux/actions/auth';
import { ThemeProvider, CssBaseline, responsiveFontSizes } from '@material-ui/core';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles'; //to avoid React strict warnings
//context
import themeReducer from './context-api/themeReducer';
import Context from './context-api/context';
//fonts
import { Champion, Gilroy, Avenir } from './fonts/fonts';
if (localStorage.token)
  setAuthToken(localStorage.token)

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  //for Dark Theme feature 
  const [state, dispatch] = useReducer(themeReducer, {
    isDark: false
  });

  const { isDark } = state;

  const mainPrimaryColor = isDark ? 'rgb(236, 178, 113)' : 'rgb(78 166 133)';       //yellow or green
  const mainSecondaryColor = isDark ? 'rgb(87, 90, 137)' : 'rgb(43, 93, 120)';     //purple or dark blue 

  let myTheme = createMuiTheme({
    palette: {
      type: isDark ? 'dark' : 'light',
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      }
    },

    typography: {
      fontFamily: Avenir.fontFamily,
      h1: {
        fontFamily: Champion.fontFamily
      },
      h2: {
        fontFamily: Gilroy.fontFamily
      },
      h4: {
        fontFamily: Gilroy.fontFamily
      },
      button: {
        fontWeight: 'bold'
      }
    },

    overrides: {
      MuiOutlinedInput: {
        root: {
          borderRadius: '30px',
          maxWidth: '400px'
        }
      },
      MuiButton: {
        root: {
          borderRadius: '30px',
          padding: '10px 20px',
          maxWidth: '200px',
        }
      },
    },

  });

  myTheme = responsiveFontSizes(myTheme);

  return (
    <Provider store={store}>
      <Router>
        <Context.Provider value={{ state, dispatch }}>

          <ThemeProvider theme={myTheme}>
            <CssBaseline />
            <div className="App">
              <Navbar />
              <Switch>
                <Route exact path="/" component={Landing} />
                <Routes />
              </Switch>

              <Footer />
            </div>
          </ThemeProvider>

        </Context.Provider>
      </Router>
    </Provider>
  );
}

export default App;
