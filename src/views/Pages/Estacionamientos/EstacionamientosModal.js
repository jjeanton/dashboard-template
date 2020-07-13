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

const EstacionamientosModal = () => {
  const dataTableContext = useContext(DataTableContext);
  const { isModalOpen, isModalUpdate, model, toggleModal, modifyModel, modelErrors, editData } = dataTableContext;
  const [empresas, setEmpresas] = useState();
  
  const loadEmpresas = async () => {
    const res = await clienteAxios.get('/api/Empresas');
    setEmpresas(res.data);
  }

  if (!empresas){
    loadEmpresas();
  }

  const validateModel = (state) => {
    let modelErrors = {}
    if (isEmpty(state.model.Nombre)) {
      modelErrors.Nombre = "Error";
    }
    if (isEmpty(state.model.Empresa)) {
      modelErrors.Empresa = "Error";
    }
    return modelErrors;
  }

  const convertModel = (model) => {
    return model;
  }

  return (
    <Modal isOpen={isModalOpen} toggle={toggleModal}
      className={'modal-success '} fade={false}>
      <ModalHeader toggle={toggleModal}>
        {!isModalUpdate ? "Nueva" : "Editar"} estacionamiento
  </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label htmlFor="Nombre">Nombre*</Label>
          <Input type="text" id="Nombre" placeholder="Ingresa el Nombre" value={model.Nombre}
            onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Nombre)} />
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

export default EstacionamientosModal;