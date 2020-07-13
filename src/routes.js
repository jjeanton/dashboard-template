import React from 'react';
const Login = React.lazy(() => import('./views/Pages/Login'));
const Usuarios = React.lazy(() => import('./views/Pages/Usuarios'));
// const Empresas = React.lazy(() => import('./views/Pages/Empresas'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/login', name: 'Ingresar', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/usuarios', name: 'Usuarios', component: Usuarios },
  // { path: '/empresas', name: 'Empresas', component: Empresas },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard }

];

export default routes;
