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

const ModulosModal = () => {
  const dataTableContext = useContext(DataTableContext);
  const { isModalOpen, isModalUpdate, model, toggleModal, modifyModel, modelErrors, editData } = dataTableContext;
  const [estacionamientos, setEstacionamientos] = useState();
  
  const loadEstacionamientos = async () => {
    const res = await clienteAxios.get('/api/Estacionamientos');
    setEstacionamientos(res.data);
  }

  if (!estacionamientos){
    loadEstacionamientos();
  }

  const validateModel = (state) => {
    let modelErrors = {}
    if (isEmpty(state.model.Nombre)) {
      modelErrors.Nombre = "Error";
    }
    if (isEmpty(state.model.Estacionamiento)) {
      modelErrors.Estacionamiento = "Error";
    }
    if (isNaN(state.model.IdModulo)) {
        modelErrors.IdModulo = "Error";
      }
    if (isEmpty(state.model.Tipo)) {
        modelErrors.Tipo = "Error";
      }
    return modelErrors;
  }

  const convertModel = (model) => {
    model.IdModulo = parseInt(model.IdModulo);
    return model;
  }

  return (
    <Modal isOpen={isModalOpen} toggle={toggleModal}
      className={'modal-success '} fade={false}>
      <ModalHeader toggle={toggleModal}>
        {!isModalUpdate ? "Nueva" : "Editar"} modulo
  </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label htmlFor="Nombre">Nombre*</Label>
          <Input type="text" id="Nombre" placeholder="Ingresa el Nombre" value={model.Nombre}
            onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Nombre)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Estacionamiento">Estacionamiento*</Label>
          <Input type="select" id="Estacionamiento" placeholder="Estacionamiento"
            onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Estacionamiento)} value={model.Estacionamiento}>
            <option key="default" value="" >Seleccionar</option>
            {estacionamientos && (
              estacionamientos.map((item) =>
                <option key={item.Id} value={item.Id}>{item.Nombre}</option>
              ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Tipo">Tipo*</Label>
          <Input type="select" id="Tipo" placeholder="Tipo"
            onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Tipo)} value={model.Tipo}>
            <option key="default" value="" >Seleccionar</option>
            <option key="a" value="Entrada" >Entrada</option>
            <option key="b" value="Cobro" >Cobro</option>
            <option key="c" value="Cupon" >Cupon</option>
            <option key="d" value="Salida" >Salida</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="IdModulo">IdModulo*</Label>
          <Input type="text" id="IdModulo" placeholder="Ingresa el IdModulo" value={model.IdModulo}
            onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.IdModulo)} />
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

export default ModulosModal;