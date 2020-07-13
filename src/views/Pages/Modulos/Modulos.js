import React from 'react';
import { Row } from 'reactstrap';
import DataTableState from '../../../context/datatable/DataTableState';
import DataTable from '../../../components/DataTable';
import ModulosModal from './ModulosModal';
import ModulosColumns from './ModulosColumns';

function Modulos() {
  return (
    <div className="animated">
      <Row>
        <DataTableState getAPI="/api/Modulos" 
                       insertAPI="/api/Modulos" 
                       updateAPI="/api/Modulos">
          <ModulosModal>
          </ModulosModal>
          <DataTable columns={ModulosColumns} title="Modulos">
          </DataTable>
        </DataTableState>
      </Row>
    </div>
  )
}

export default Modulos;