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

const TarifasPensionModal = () =>
{
    const dataTableContext = useContext(DataTableContext);
    const { isModalOpen, isModalUpdate, model, toggleModal, modifyModel, modelErrors, editData } = dataTableContext;

    const validateModel = (state) => {      
      let modelErrors = {}
      if (isEmpty(state.model.Descripcion))
      {
        modelErrors.Descripcion = "Error";
      }
      if (isNaN(state.model.Dias))
      {
        modelErrors.Dias = "Error";
      }
      if (isNaN(state.model.Monto))
      {
        modelErrors.Monto = "Error";
      }

      if (isNaN(state.model.DiaTolerancia))
      {
        modelErrors.DiaTolerancia = "Error";
      }
      return modelErrors;
    }

    const convertModel = (model) => {
        model.Dias = parseInt(model.Dias);
        model.Monto = parseInt(model.Monto);
        model.DiaTolerancia = parseInt(model.DiaTolerancia);
        return model;
    }

    return (
        <Modal isOpen={isModalOpen} toggle={toggleModal}
        className={'modal-success '} fade={false}>
  <ModalHeader toggle={toggleModal}>
    {!isModalUpdate ? "Nueva" : "Editar"} tarifa pension
  </ModalHeader>
  <ModalBody>
    <FormGroup>
      <Label htmlFor="Descripcion">Descripcion*</Label>
      <Input type="text" id="Descripcion" placeholder="Ingresa la Descripcion" value={model.Descripcion}
           onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Descripcion)}/>
    </FormGroup>
    <FormGroup>
      <Label htmlFor="Dias">Dias*</Label>
      <Input type="text" id="Dias" placeholder="Cantidad de Dias" value={model.Dias}
           onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Dias)}/>
    </FormGroup>
    <FormGroup>
      <Label htmlFor="Monto">Monto*</Label>
      <Input type="text" id="Monto" placeholder="Ingresa el Monto" value={model.Monto}
           onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Monto)}/>
    </FormGroup>
    <FormGroup>
      <Label htmlFor="DiaTolerancia">Dias de Tolerancia*</Label>
      <Input type="text" id="DiaTolerancia" placeholder="Dias de tolerancia" value={model.DiaTolerancia}
           onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.DiaTolerancia)}/>
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

export default TarifasPensionModal;