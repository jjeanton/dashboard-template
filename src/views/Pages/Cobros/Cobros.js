import React, { useState, useEffect } from 'react';
import PaginationDataTable from '../../../components/Pagination/PaginationDataTable';
import PaginationState from '../../../context/pagination/PaginationState';
import columns from './CobrosColumns';
import CobrosFilters from './CobrosFilters'
function Cobros() {


  return (
    <PaginationState getAPI="/api/Cobros"
                     getCsv="/api/Cobros/Csv"
                     Title="Cobros"
                     Columns={columns}
                     >
      <PaginationDataTable>
        <CobrosFilters />
      </PaginationDataTable>
    </PaginationState>
  )
}

export default Cobros;