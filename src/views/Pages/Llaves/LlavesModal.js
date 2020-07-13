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

const LlavesModal = () =>
{
    const dataTableContext = useContext(DataTableContext);
    const { isModalOpen, isModalUpdate, model, toggleModal, modifyModel, modelErrors, editData } = dataTableContext;
    const [tiposLlave, setTiposLlave] = useState();

    const loadTiposLlave = async () => {
        const res = await clienteAxios.get('/api/TiposLlave');
        setTiposLlave(res.data);
    }

    if (!tiposLlave)
    {
      loadTiposLlave();
    }

    const validateModel = (state) => {      
      let modelErrors = {}
      if (isEmpty(state.model.Identificador))
      {
        modelErrors.Identificador = "Error";
      }
      if (isEmpty(state.model.TipoLlave))
      {
        modelErrors.TipoLlave = "Error";
      }
      return modelErrors;
    }

    return (
        <Modal isOpen={isModalOpen} toggle={toggleModal}
        className={'modal-success '} fade={false}>
  <ModalHeader toggle={toggleModal}>
    {!isModalUpdate ? "Nueva" : "Editar"} llave
  </ModalHeader>
  <ModalBody>
    <FormGroup>
      <Label htmlFor="Identificador">Identificador*</Label>
      <Input type="text" id="Identificador" placeholder="Ingresa el Identificador" value={model.Identificador}
           onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Identificador)}/>
    </FormGroup>
    <FormGroup>
      <Label htmlFor="TipoLlave">Tipo de Llave*</Label>
      <Input type="select" id="TipoLlave" placeholder="Tipo de Llave" 
      onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.TipoLlave)} value={model.TipoLlave}>
          <option key="default" value="" >Seleccionar</option>
          {tiposLlave && (
              tiposLlave.map((item) =>
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
    <Button color="success" onClick={() => editData(validateModel)}>Guardar</Button>{' '}
    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
  </ModalFooter>
</Modal>
    );
}

function isEmpty(str) {
  return (!str || 0 === str.length);
}

export default LlavesModal;