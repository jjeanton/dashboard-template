import React, { useContext } from 'react';
import {
    Button, Col, Row,
    Modal, ModalBody, ModalFooter, ModalHeader,
    Label, FormGroup, Input
} from 'reactstrap';
import DataTableContext from '../../../context/datatable/DataTableContext';

const errorClass = (error) => {
    return (!error || error.length === 0 ? '' : 'is-invalid');
}

const TarifasModal = () => {
    const dataTableContext = useContext(DataTableContext);
    const { isModalOpen, isModalUpdate, model, toggleModal, modifyModel, modelErrors, editData } = dataTableContext;

    const validateModel = (state) => {
        let modelErrors = {}

        if (isEmpty(state.model.Descripcion)) {
            modelErrors.Descripcion = "Error";
        }
        if (isNaN(state.model.Tarifa_1)) {
            modelErrors.Tarifa_1 = "Error";
        }
        if (isNaN(state.model.Cobertura_1)) {
            modelErrors.Cobertura_1 = "Error";
        }
        if (isNaN(state.model.Tolerancia_1)) {
            modelErrors.Tolerancia_1 = "Error";
        }
        if (isNaN(state.model.Tarifa_2)) {
            modelErrors.Tarifa_2 = "Error";
        }
        if (isNaN(state.model.Cobertura_2)) {
            modelErrors.Cobertura_2 = "Error";
        }
        if (isNaN(state.model.Tolerancia_2)) {
            modelErrors.Tolerancia_2 = "Error";
        }
        if (isNaN(state.model.TarifaPorDia)) {
            modelErrors.TarifaPorDia = "Error";
        }
        if (isNaN(state.model.MaximoTDia)) {
            modelErrors.MaximoTDia = "Error";
        }
        if (isNaN(state.model.TolPorDia)) {
            modelErrors.TolPorDia = "Error";
        }
        return modelErrors;
    }

    const convertModel = (model) => {
        model.Tarifa_1 = parseFloat(model.Tarifa_1);
        model.Cobertura_1 = parseInt(model.Cobertura_1);
        model.Tolerancia_1 = parseInt(model.Tolerancia_1);
        model.Tarifa_2 = parseFloat(model.Tarifa_2);
        model.Cobertura_2 = parseInt(model.Cobertura_2);
        model.Tolerancia_2 = parseInt(model.Tolerancia_2);
        model.TarifaPorDia = parseFloat(model.TarifaPorDia);
        model.MaximoTDia = parseInt(model.MaximoTDia);
        model.TolPorDia = parseInt(model.TolPorDia);
        return model;
    }

    return (
        <Modal isOpen={isModalOpen} toggle={toggleModal}
            className={'modal-success '} fade={false}>
            <ModalHeader toggle={toggleModal}>
                {!isModalUpdate ? "Nueva" : "Editar"} tarifa
  </ModalHeader>
            <ModalBody>

                <FormGroup>
                    <Label htmlFor="Descripcion">Descripcion</Label>
                    <Input type="text" id="Descripcion" placeholder="" value={model.Descripcion}
                        onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Descripcion)} />
                </FormGroup>

                <Label>Tarifa Primer Tiempo</Label>
                <Row>
                    <Col className="col-sm-4">
                        <FormGroup>
                            <Label htmlFor="Tarifa_1">Tarifa</Label>
                            <Input type="text" id="Tarifa_1" placeholder="" value={model.Tarifa_1}
                                onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Tarifa_1)} />
                        </FormGroup>
                    </Col>
                    <Col className="col-sm-4">
                        <FormGroup>
                            <Label htmlFor="Cobertura_1">Cobertura (min)</Label>
                            <Input type="text" id="Cobertura_1" placeholder="" value={model.Cobertura_1}
                                onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Cobertura_1)} />
                        </FormGroup>
                    </Col>
                    <Col className="col-sm-4">
                        <FormGroup>
                            <Label htmlFor="Tolerancia_1">Tolerancia (min)</Label>
                            <Input type="text" id="Tolerancia_1" placeholder="" value={model.Tolerancia_1}
                                onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Tolerancia_1)} />
                        </FormGroup>
                    </Col>
                </Row>

                <Label>Tarifa Segundo Tiempo</Label>
                <Row>
                    <Col className="col-sm-4">
                        <FormGroup>
                            <Label htmlFor="Tarifa_2">Tarifa</Label>
                            <Input type="text" id="Tarifa_2" placeholder="" value={model.Tarifa_2}
                                onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Tarifa_2)} />
                        </FormGroup>
                    </Col>
                    <Col className="col-sm-4">
                        <FormGroup>
                            <Label htmlFor="Cobertura_2">Cobertura (min)</Label>
                            <Input type="text" id="Cobertura_2" placeholder="" value={model.Cobertura_2}
                                onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Cobertura_2)} />
                        </FormGroup>
                    </Col>
                    <Col className="col-sm-4">
                        <FormGroup>
                            <Label htmlFor="Tolerancia_2">Tolerancia (min)</Label>
                            <Input type="text" id="Tolerancia_2" placeholder="" value={model.Tolerancia_2}
                                onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.Tolerancia_2)} />
                        </FormGroup>
                    </Col>
                </Row>

                <Label>Tarifa Por Dia</Label>
                <Row>
                    <Col className="col-sm-4">
                        <FormGroup>
                            <Label htmlFor="TarifaPorDia">Tarifa</Label>
                            <Input type="text" id="TarifaPorDia" placeholder="" value={model.TarifaPorDia}
                                onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.TarifaPorDia)} />
                        </FormGroup>
                    </Col>
                    <Col className="col-sm-4">
                        <FormGroup>
                            <Label htmlFor="MaximoTDia">Cobertura (min)</Label>
                            <Input type="text" id="MaximoTDia" placeholder="" value={model.MaximoTDia}
                                onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.MaximoTDia)} />
                        </FormGroup>
                    </Col>
                    <Col className="col-sm-4">
                        <FormGroup>
                            <Label htmlFor="TolPorDia">Tolerancia (min)</Label>
                            <Input type="text" id="TolPorDia" placeholder="" value={model.TolPorDia}
                                onChange={(e) => modifyModel(e.target.id, e.target.value)} className={errorClass(modelErrors.TolPorDia)} />
                        </FormGroup>
                    </Col>
                </Row>
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

export default TarifasModal;