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
      Header: 'Descripcion',
      accessor: 'Descripcion'
    },
    {
      Header: 'Tarifa Primer Tiempo',
      columns: [
        {
          Header: 'Tarifa 1',
          accessor: 'Tarifa_1',
        },
        {
          Header: 'Cobertura 1',
          accessor: 'Cobertura_1',
        },
        {
          Header: 'Tolerancia 1',
          accessor: 'Tolerancia_1',
        },
      ]
    },
    {
      Header: 'Tarifa Segundo Tiempo',
      columns: [
        {
          Header: 'Tarifa 2',
          accessor: 'Tarifa_2',
        },
        {
          Header: 'Cobertura 2',
          accessor: 'Cobertura_2',
        },
        {
          Header: 'Tolerancia 2',
          accessor: 'Tolerancia_2',
        },
      ]
    },
    {
      Header: 'Tarifa Por Dia',
      columns: [
        {
          Header: 'Cobertura Por Dia',
          accessor: 'MaximoTDia',
        },
        {
          Header: 'Tarifa Por Dia',
          accessor: 'TarifaPorDia',
        },
        {
          Header: 'Tolerancia Por Dia',
          accessor: 'TolPorDia',
        },
      ]
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