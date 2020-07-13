import React, { useContext, useEffect, useState, useRef } from 'react';
import { AppSwitch } from '@coreui/react';
// import WidgetData from './WidgetData';
// import PrincipalGraph from './PrincipalGraph';
// import DashboardContext from '../context/dashboard/dashboardContext';
import moment from 'moment';
import Spinner from 'react-spinkit';
import {
    Col,
    Row,
    Button,
    ButtonGroup,
    ButtonToolbar,
} from 'reactstrap';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
// import WidgetByModule from './WidgetByModule';
import { DateRangePicker } from 'rsuite';
// import ToasterComponent from './ToasterComponet';

const info = getStyle('--info');
// const primary = getStyle('--primary');
const danger = getStyle('--danger');
const warning = getStyle('--warning');
const success = getStyle('--success');
const secondary = getStyle('--secondary');
const styleModule = [
    {text: 'info', value:info, icon:'icon-login'},
    {text: 'warning', value:warning, icon:'icon-logout'},
    {text: 'danger', value:danger, icon:'icon-present'},
]
const stylesWidget = [
    {text: 'success', value:success, icon:'cui-dollar'},
    {text: 'info', value:info, icon:'icon-login'},
    {text: 'warning', value:warning, icon:'icon-logout'},
    {text: 'danger', value:danger, icon:'icon-present'},
];

 function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
}
 
  
const DashboardComponent = () => {
    
    return ( 
        <div className="animated fadeIn">
           
        </div>
    );
}
 
export default DashboardComponent;