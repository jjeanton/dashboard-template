import React, {useState, useEffect, useContext} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ToastContext from '../context/toaster/toastContext';

const ToasterComponent = () => {
    const toasterContext = useContext(ToastContext);
    const {toaster, showToaster} = toasterContext;

    useEffect(() => {
        if(toaster) {
            toast[`${toaster.type}`](toaster.msg, toaster.config);
        }
    }, [toaster])
    return ( 
        <ToastContainer />
     );
}
 
export default ToasterComponent;