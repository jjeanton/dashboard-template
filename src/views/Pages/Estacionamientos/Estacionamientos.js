import React from 'react';
import { Row } from 'reactstrap';
import DataTableState from '../../../context/datatable/DataTableState';
import DataTable from '../../../components/DataTable';
import EstacionamientosModal from './EstacionamientosModal';
import EstacionamientosColumns from './EstacionamientosColumns';

function Estacionamientos() {
  return (
    <div className="animated">
      <Row>
        <DataTableState getAPI="/api/Estacionamientos" 
                       insertAPI="/api/Estacionamientos" 
                       updateAPI="/api/Estacionamientos">
          <EstacionamientosModal>
          </EstacionamientosModal>
          <DataTable columns={EstacionamientosColumns} title="Estacionamientos">
          </DataTable>
        </DataTableState>
      </Row>
    </div>
  )
}

export default Estacionamientos;