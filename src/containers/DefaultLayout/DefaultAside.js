import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SearchState from '../../context/search/searchState';
// import SearchComponent from '../../components/SearchComponent';
// import ParkingListComponent from '../../components/ParkingListComponent';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultAside extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <SearchState>
          <Nav tabs>
            <NavItem>
              <NavLink className={classNames({ active: this.state.activeTab === '1' })}
                      onClick={() => {
                        this.toggle('1');
                      }}>
                <i className="cui-magnifying-glass"></i>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classNames({ active: this.state.activeTab === '2' })}
                      onClick={() => {
                        this.toggle('2');
                      }}>
                <i className="cui-speedometer"></i>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              {/* <SearchComponent /> */}
            </TabPane>
            <TabPane tabId="2">
              {/* <ParkingListComponent /> */}
            </TabPane>
          </TabContent>
        </SearchState>
      </React.Fragment>
    );
  }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

export default DefaultAside;
