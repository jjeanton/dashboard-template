import React from 'react';
import { Row } from 'reactstrap';
import DataTableState from '../../../context/datatable/DataTableState';
import DataTable from '../../../components/DataTable';
import TarifasModal from './TarifasModal';
import TarifasColumns from './TarifasColumns';

function Tarifas() {
  return (
    <div className="animated">
      <Row>
        <DataTableState getAPI="/api/Tarifas" 
                       insertAPI="/api/Tarifas" 
                       updateAPI="/api/Tarifas">
          <TarifasModal>
          </TarifasModal>
          <DataTable columns={TarifasColumns} title="Tarifas">
          </DataTable>
        </DataTableState>
      </Row>
    </div>
  )
}

export default Tarifas;