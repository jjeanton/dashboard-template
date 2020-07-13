import React from 'react';
import { Row } from 'reactstrap';
import DataTableState from '../../../context/datatable/DataTableState';
import DataTable from '../../../components/DataTable';
import TarifasPensionModal from './TarifasPensionModal';
import TarifasPensionColumns from './TarifasPensionColumns';

function TarifasPension() {
  return (
    <div className="animated">
      <Row>
        <DataTableState getAPI="/api/TarifasPension" 
                       insertAPI="/api/TarifasPension" 
                       updateAPI="/api/TarifasPension">
          <TarifasPensionModal>
          </TarifasPensionModal>
          <DataTable columns={TarifasPensionColumns} title="Tarifas Pension">
          </DataTable>
        </DataTableState>
      </Row>
    </div>
  )
}

export default TarifasPension;