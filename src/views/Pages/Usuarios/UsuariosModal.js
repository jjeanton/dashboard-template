import React, { useState, useContext, useEffect } from 'react';
import {
  Button,
  Modal, ModalBody, ModalFooter, ModalHeader,
  Label, FormGroup, Input
} from 'reactstrap';
import DataTableContext from '../../../context/datatable/DataTableContext';
import clienteAxios from '../../../config/axios';
import {CheckPicker, Container} from 'rsuite';

const errorClass = (error) => {
  return (!error || error.length === 0 ? '' : 'is-invalid');
}

const UsuariosModal = () => {
  const dataTableContext = useContext(DataTableContext);
  const { isModalOpen, isModalUpdate, model, toggleModal, modifyModel, modelErrors, editData } = dataTableContext;
  const [tiposUsuario, setTiposUsuario] = useState();
  const [empresas, setEmpresas] = useState();
  const [estacionamientos, setEstacionamientos] = useState();
  var modelRef = React.useRef();

  useEffect(() => {
    loadEstacionamientos(model.Empresa);
  }, [model.Empresa]);

  const loadTiposUsuario = async () => {
    const res = await clienteAxios.get('/api/TiposUsuarios');
    setTiposUsuario(res.data);
  }

  const loadEmpresas = async () => {
    const res = await clienteAxios.get('/api/Empresas');
    setEmpresas(res.data);
  }

  const loadEstacionamientos = async (Empresa) => {
    const res = await clienteAxios.get('/api/Estacionamientos/empresa', {params:{ Empresa: Empresa}});
    setEstacionamientos(res.data);
  }

  if (!empresas){
    loadEmpresas();
  }

  if (!tiposUsuario) {
    loadTiposUsuario();
  }

  const validateModel = (state) => {
    let modelErrors = {}
    if (isEmpty(state.model.Nombre)) {
      modelErrors.Nombre = "Error";
    }
    if (!state.isModalUpdate && isEmpty(state.model.Contrasenia)) {
      modelErrors.Contrasenia = "Error";
    }
    if (!validateEmail(state.model.Email)) {
      modelErrors.Email = "Error";
    }
    if (isEmpty(state.model.Telefono)) {
      modelErrors.Telefono = "Error";
    }
    if (isEmpty(state.model.TipoUsuario)) {
      modelErrors.TipoUsuario = "Error";
    }
    if (isEmpty(state.model.Empresa)) {
      modelErrors.Empresa = "Error";
    }
    if (isEmpty(state.model.Estacionamiento)) {
      modelErrors.Estacionamiento = "Error";
    }
    return modelErrors;
  }

  const convertModel = (model) => {
    model.Contrasenia = "noseusa";
    return model;
  }  
  console.log(modelRef.current);

  return (
    <Modal isOpen={isModalOpen} toggle={toggleModal} ref={modelRef}
      className={'modal-success '} fade={false}>
      <ModalHeader toggle={toggleModal}>
        {!isModalUpdate ? "Nuevo" : "Editar"} usuario
  </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label htmlFor="Nombre">Nombre*</Label>
          <Input type="text" id="Nombre" placeholder="Ingresa el nombre del usuario" value={model.Nombre}
            onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Nombre)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Email">Email*</Label>
          <Input type="email" id="Email" placeholder="Ingresa el correo electronico" value={model.Email}
            onChange={(e) => modifyModel(e.target.id, e.target.value)} autoComplete="off" className={errorClass(modelErrors.Email)} />
        </FormGroup>
        {!isModalUpdate && (
          <FormGroup>
            <Label htmlFor="Contrasenia">Contraseña*</Label>
            <Input type="password" id="Contrasenia" placeholder="Ingresa la contraseña" value={model.Contrasenia}
              onChange={(e) => modifyModel(e.target.id, e.target.value)} autoComplete="new-password" className={errorClass(modelErrors.Contrasenia)} />
          </FormGroup>)}
        <FormGroup>
          <Label htmlFor="Direccion">Dirección</Label>
          <Input type="text" id="Direccion" placeholder="Ingresa la dirección" value={model.Direccion}
            onChange={(e) => modifyModel(e.target.id, e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Telefono">Teléfono*</Label>
          <Input type="text" id="Telefono" placeholder="Ingresa el télefono" value={model.Telefono}
            onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Telefono)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Empresa">Empresa*</Label>
          <Input type="select" id="Empresa" placeholder="Empresa"
            onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Empresa)} value={model.Empresa}>
            <option key="default" value="" >Seleccionar</option>
            {empresas && (
              empresas.map((item) =>
                <option key={item.Id} value={item.Id}>{item.Nombre}</option>
              ))}
          </Input>
        </FormGroup>
        <FormGroup> 
          <Label htmlFor="Estacionamiento">Estacionamiento*</Label>
            <CheckPicker preventOverflow={true} data={estacionamientos} labelKey={"Nombre"} valueKey={"Nombre"} block container={modelRef}/>
          {/* <Input type="select" id="Estacionamiento" placeholder="Estacionamiento"
            onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Estacionamiento)} value={model.Estacionamiento}>
            <option key="default" value="" >Seleccionar</option>
            {estacionamientos && (
              estacionamientos.map((item) =>
                <option key={item.Id} value={item.Id}>{item.Nombre}</option>
              ))}
          </Input> */}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="TipoUsuario">Tipo de Usuario*</Label>
          <Input type="select" id="TipoUsuario" placeholder="Tipo de Usuario"
            onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.TipoUsuario)} value={model.TipoUsuario}>
            <option key="default" value="" >Seleccionar</option>
            {tiposUsuario && (
              tiposUsuario.map((item) =>
                <option key={item.Id} value={item.Id}>{item.Descripcion}</option>
              ))}
          </Input>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input id="Estatus" type="checkbox" onChange={(e) => modifyModel(e.target.id, e.target.checked)} checked={model.Estatus} />{' '}
          Activo
        </Label>
        </FormGroup>

      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => editData(validateModel, convertModel)}>Guardar</Button>{' '}
        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

function isEmpty(str) {
  return (!str || 0 === str.length);
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default UsuariosModal;