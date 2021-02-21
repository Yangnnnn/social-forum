import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import { Provider } from 'react-redux';
import store from './store';
const App = () => (
  <Provider store={store}>
    <Router>
      <>
        <Navbar />
        <Route exact path='/'>
          <Landing />
        </Route>
        <section className='container'>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </section>
      </>
    </Router>
  </Provider>
);

export default App;
