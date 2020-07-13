import React from 'react';
import PaginationDataTable, { DateRangeColumnFilter } from '../../Base/DataTable/_PaginationDataTable';


function Cupones() {
    const Columns = [
        {
            Header: 'Boleto',
            accessor: 'Boleto'
        },
        {
            Header: 'Fecha',
            accessor: 'Fecha',
            // Filter: DateRangeColumnFilter,
        },
        {
            Header: 'Convenio',
            accessor: 'Convenio',
        },
        {
            Header: 'Modulo',
            accessor: 'Modulo',
        },
        {
            Header: 'Tipo',
            accessor: 'Tipo',
        },
        {
            Header: 'Dato',
            accessor: 'Dato',
        },
    ];

  return (

    <PaginationDataTable Columns={Columns} 
    Title="Cupones" 
    getAPI="/api/Cupones?"
    getCsv="/api/Cupones/Csv?">

    </PaginationDataTable>
  )
}

export default Cupones;