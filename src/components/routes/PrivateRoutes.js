import React, {useContext, useEffect, Fragment} from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({component: Component, ...props}) => {
    const authContext = useContext(AuthContext);
    const {auth, loading, userAuth} = authContext;
    useEffect(() => {
        userAuth();
    }, []);
    
    return (
        <Fragment>
            {!loading ? (
                <Route {...props} render={props => !auth ? (
                    <Redirect to="/login"/>
                ) : (
                    <Component {...props} />
                ) }

                />
            ) : null}

        </Fragment>
        
     );
}
 
export default PrivateRoute;