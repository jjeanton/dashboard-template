import React, { useState, useContext } from 'react';
import {
    Button,
    Modal, ModalBody, ModalFooter, ModalHeader,
    Label, FormGroup, Input
} from 'reactstrap';
import DataTableContext from '../../../context/datatable/DataTableContext';
import clienteAxios from '../../../config/axios';

const errorClass = (error) => {  
    return (!error || error.length === 0 ? '' : 'is-invalid');
  }

const UsuariosPasswordModal = (props) =>
{
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [modelErrors, setModelErrors] = useState({});

    const validateModel = () => {      
      let _modelErrors = {}
      if (isEmpty(password))
      {
        _modelErrors.Password = "Error";
      }
      if (isEmpty(rePassword))
      {
        _modelErrors.RePassword = "Error";
      }
      return _modelErrors;
    }

    const changePassword = async () => {

        let _modelErrors = validateModel();
        console.log(_modelErrors);
        if (!isEmptyObject(_modelErrors)) {
            setModelErrors(_modelErrors);
            return;
        }
        console.log(props.userId);
        await clienteAxios.post(props.API, {
            Id: props.userId,
            Password: password,
            RePassword: rePassword
        });
        props.toggleModal("");
    }

    return (
        <Modal isOpen={props.isModalOpen} toggle={props.toggleModal}
        className={'modal-success '} fade={false}>
  <ModalHeader toggle={props.toggleModal}>
    Cambiar contraseña
  </ModalHeader>
  <ModalBody>
    
  <FormGroup>
      <Label htmlFor="Password">Contraseña*</Label>
      <Input type="password" id="Password" placeholder="Ingresa la contraseña" value={password}
      onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" className={errorClass(modelErrors.Password)}/>
    </FormGroup>
    <FormGroup>
      <Label htmlFor="RePassword">Contraseña*</Label>
      <Input type="password" id="RePassword" placeholder="Repita la contraseña" value={rePassword}
      onChange={(e) => setRePassword(e.target.value)} autoComplete="new-password" className={errorClass(modelErrors.RePassword)}/>
    </FormGroup>

  </ModalBody>
  <ModalFooter>
    <Button color="success" onClick={() => changePassword()}>Guardar</Button>{' '}
    <Button color="secondary" onClick={props.toggleModal}>Cancel</Button>
  </ModalFooter>
</Modal>
    );
}

function isEmpty(str) {
  return (!str || 0 === str.length);
}

function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default UsuariosPasswordModal;