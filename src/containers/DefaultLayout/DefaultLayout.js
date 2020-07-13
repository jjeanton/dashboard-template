import React, { Suspense, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import AuthContext from '../../context/auth/authContext';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

const DefaultLayout = (props) => {

  const authContext = useContext(AuthContext);
  const { menu, loading, userAuth } = authContext;
  const [datamenu, setDatamenu] = useState({items:[
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    }
  ]})
  
  
  useEffect(() => {
    setDatamenu({items:menu});
    
  }, [menu]);

  //const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  const signOut = (e) => {
    e.preventDefault()
    this.props.history.push('/login')
  }

    return (
      <div className="app">
        <AppHeader fixed>
          {/* <Suspense  fallback={loading}> */}
            <DefaultHeader onLogout={signOut}/>
          {/* </Suspense> */}
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={datamenu ? datamenu : navigation} {...props} router={router}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router}/>
            <Container fluid>
              <Suspense fallback={loading}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          {/* <AppAside fixed>
              <DefaultAside />
          </AppAside> */}
        </div>
      </div>
    );
}

export default DefaultLayout;
