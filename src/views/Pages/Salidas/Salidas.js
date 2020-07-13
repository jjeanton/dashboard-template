import React, { useState, useEffect } from 'react';
import PaginationDataTable from '../../../components/Pagination/PaginationDataTable';
import PaginationState from '../../../context/pagination/PaginationState';
import columns from './SalidasColumns';
import SalidasFilters from './SalidasFilters'
function Salidas() {


  return (
    <PaginationState getAPI="/api/Salidas"
                     getCsv="/api/Salidas/Csv"
                     Title="Salidas"
                     Columns={columns}
                     >
      <PaginationDataTable>
        <SalidasFilters />
      </PaginationDataTable>
    </PaginationState>
  )
}

export default Salidas;