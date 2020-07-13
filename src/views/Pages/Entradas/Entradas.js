import React, { useState, useEffect } from 'react';
import PaginationDataTable from '../../../components/Pagination/PaginationDataTable';
import PaginationState from '../../../context/pagination/PaginationState';
import columns from './EntradasColumns';
import EntradasFilters from './EntradasFilters'
function Entradas() {


  return (
    <PaginationState getAPI="/api/Entradas"
                     getCsv="/api/Entradas/Csv"
                     Title="Entradas"
                     Columns={columns}
                     >
      <PaginationDataTable>
        <EntradasFilters />
      </PaginationDataTable>
    </PaginationState>
  )
}

export default Entradas;