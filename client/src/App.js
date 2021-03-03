import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import { Provider } from 'react-redux';
import store from './store';
import { useEffect } from 'react';
import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import AddExperience from './components/profile/AddExperience';
import AddEducation from './components/profile/AddEducation';
import Profiles from './components/profiles/Profiles';

const App = () => {
  useEffect(async () => {
    store.dispatch(await loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path='/'>
            <Landing />
          </Route>
          <section className='container'>
            <Alert></Alert>
            <Switch>
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/profiles' component={Profiles} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path='/add-experience'
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path='/add-education'
                component={AddEducation}
              />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
};

export default App;
