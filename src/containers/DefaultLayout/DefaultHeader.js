import React, {  useState, useContext, useEffect } from 'react';
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/e-control-logo1.png';
import icono from '../../assets/img/brand/apple-touch-icon.png';
import SearchState from '../../context/search/searchState';
import AuthContext from '../../context/auth/authContext';

const DefaultHeader = () => {
  const authContext = useContext(AuthContext);
  const { user, logout } = authContext;
  const [avatar, setAvatar] = useState({
    color: '#064ca1',
    name: ''
  });

  if (user && user.Nombre && avatar.name === '') {
    var nameEdit = '';
    if (user) {
      const initialsName = user.Nombre.match(/\b\w/g);
      nameEdit = initialsName.length > 2 ? initialsName[0] + initialsName[2] : initialsName;
    }
    setAvatar({
      color: '#064ca1',//`#${Math.floor(Math.random()*16777215).toString(16)}`,
      name: nameEdit
    })
  }

    return (
      <React.Fragment>
        <SearchState>
          <AppSidebarToggler className="d-lg-none" display="md" mobile />
          <AppNavbarBrand
              full={{ src: logo, width: 89, height: 27, alt: 'Antares Logo' }}
              minimized={{ src: icono, width: 30, height: 30, alt: 'Antares Logo' }}
          />
          <AppSidebarToggler className="d-md-down-none mr-auto" display="lg"  />
          <Nav className="ml-auto">
            <UncontrolledDropdown nav direction="down">
              <DropdownToggle nav>
              <div className="div-avatar" style={{backgroundColor: avatar.color}}>{avatar.name}</div>
              </DropdownToggle>
                {user ? (
                  <DropdownMenu right>
                    <DropdownItem header tag="div" className="text-center">
                      <strong>
                        {user ? user.Nombre : ''}
                      </strong>
                      <div><i className="cui-user"></i> {user ? user.Email : ''}</div>
                    </DropdownItem>
                    <DropdownItem onClick={() => logout()}><i className="cui-account-logout"></i> Cerrar Sesión</DropdownItem>
                  </DropdownMenu>
                ) : null}

                
            </UncontrolledDropdown>
          </Nav>
          

          <AppAsideToggler className="d-md-down-none" />
          <AppAsideToggler className="d-lg-none" mobile />
        </SearchState>

      </React.Fragment>
    );
}

export default DefaultHeader;
