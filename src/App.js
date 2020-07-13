import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router, HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import 'rsuite/dist/styles/rsuite-default.css';
import tokenAuth from './config/tokenAuth';
import 'react-toastify/dist/ReactToastify.css';
import ToasterComponent from './components/ToasterComponet';

// HOC
import PrivateRoute from './components/routes/PrivateRoutes';

// States
import AuthState from './context/auth/authState';
import ToasterState from './context/toaster/toastState';


const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
// const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

// Have Token???
// const token = localStorage.getItem('token');
// if(token) {
//   tokenAuth(token);
// }

const App = () => {

    return (
      <AuthState>
        <ToasterState>
          <ToasterComponent />
             <React.Suspense fallback={loading()}>
              {/*<Switch>
                <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
                <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                <PrivateRoute path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
              </Switch>*/}
              <Router>
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/404" name="Page 404" component={Page404} />
                  <Route exact path="/500" name="Page 500" component={Page500} />
                  <Route path="/" name="Home" component={DefaultLayout} />
                  {/* <PrivateRoute path="/" name="Home" component={DefaultLayout} /> */}
                </Switch>
              </Router>
            </React.Suspense> 
        </ToasterState>

          </AuthState>
    );
}

export default App;
