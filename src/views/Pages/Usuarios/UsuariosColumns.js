import {
    Button, Row
  } from 'reactstrap';
import React from 'react';
import EstatusColumnFilter from '../../Base/DataTable/Filters'

export default (editRowHandler, {togglePasswrodModal, estacionamientosHandler}) =>
{

    const convertModel = (model) =>
    {
        model.TipoUsuario = model.IdTipoUsuario;
        model.Empresa = model.IdEmpresa;
        model.Estacionamiento = model.IdEstacionamiento;
        editRowHandler(model);
    }

    return [
        {
            Header: 'Nombre',
            accessor: 'Nombre'
        },
        {
            Header: 'Email',
            accessor: 'Email',
        },
        {
            Header: 'Empresa',
            accessor: 'Empresa',
        },
        {
            Header: 'Tipo Usuario',
            accessor: 'TipoUsuario',
        },
        {
            Header: 'Direccion',
            accessor: 'Direccion',
        },
        {
            Header: 'Telefono',
            accessor: 'Telefono',
        },
        {
            Header: 'Estado',
            accessor: 'Estatus',
            Filter: EstatusColumnFilter,
            Cell: ({ row }) => (
                <span className={"badge badge-" + (row.values.Estatus === true ? "success" : "danger")}>
                    {row.values.Estatus === true ? 'Activo' : 'Inactivo'}
                </span>
            ),
        },
        {
            Header: () => null,
            id: 'actions',
            width: 500,
            disableFilters: true,
            disableSortBy: true,
            Cell: ({ row }) => (
                <Row>
                    <Button color="success" size="sm" className="" onClick={() => convertModel(row.original)}>
                        <i className="fa fa-pencil"></i>
                    </Button>
                    <Button color="warning" size="sm" className="" onClick={() => togglePasswrodModal(row.original)}>
                        <i className="fa fa-key"></i>
                    </Button>
                    <Button color="secondary" size="sm" className="" onClick={() => estacionamientosHandler(row.original)}>
                        <i className="cui-location-pin"></i>
                    </Button>
                </Row>
            ),
        },];
} 