import React, { useContext } from 'react';
import {
    Button,
    Modal, ModalBody, ModalFooter, ModalHeader,
    Label, FormGroup, Input
} from 'reactstrap';
import DataTableContext from '../../../context/datatable/DataTableContext';

const errorClass = (error) => {  
    return (!error || error.length === 0 ? '' : 'is-invalid');
  }

const EmpresasModal = () =>
{
    const dataTableContext = useContext(DataTableContext);
    const { isModalOpen, isModalUpdate, model, toggleModal, modifyModel, modelErrors, editData } = dataTableContext;

    const validateModel = (state) => {      
      let modelErrors = {}
      if (isEmpty(state.model.Nombre))
      {
        modelErrors.Nombre = "Error";
      }
      if (isEmpty(state.model.Direccion))
      {
        modelErrors.Direccion = "Error";
      }
      if (isEmpty(state.model.Telefono))
      {
        modelErrors.Telefono = "Error";
      }
      if (isEmpty(state.model.RFC))
      {
        modelErrors.RFC = "Error";
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
    {!isModalUpdate ? "Nueva" : "Editar"} empresa
  </ModalHeader>
  <ModalBody>
    <FormGroup>
      <Label htmlFor="Nombre">Nombre*</Label>
      <Input type="text" id="Nombre" placeholder="Ingresa el Nombre" value={model.Nombre}
           onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Nombre)}/>
    </FormGroup>
    <FormGroup>
      <Label htmlFor="Direccion">Direccion*</Label>
      <Input type="text" id="Direccion" placeholder="Ingresa la Direccion" value={model.Direccion}
           onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Direccion)}/>
    </FormGroup>
    <FormGroup>
      <Label htmlFor="Telefono">Telefono*</Label>
      <Input type="text" id="Telefono" placeholder="Ingresa el Telefono" value={model.Telefono}
           onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Telefono)}/>
    </FormGroup>
    <FormGroup>
      <Label htmlFor="RFC">RFC*</Label>
      <Input type="text" id="RFC" placeholder="RFC" value={model.RFC}
           onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.RFC)}/>
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

export default EmpresasModal;