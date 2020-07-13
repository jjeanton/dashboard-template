import {
    Button, Row
} from 'reactstrap';
import React from 'react';
import EstatusColumnFilter from '../../Base/DataTable/Filters'

export default (editRowHandler) => {
    const convertModel = (model) => {
        editRowHandler(model);
    }

    return [
        {
            Header: 'Nombre',
            accessor: 'Nombre'
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
            Header: 'RFC',
            accessor: 'RFC',
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
                    <Button color="success" size="sm" className="mr-1" onClick={() => convertModel(row.original)}>
                        <i className="fa fa-pencil"></i>
                    </Button>
                </Row>
            ),
        },];
}