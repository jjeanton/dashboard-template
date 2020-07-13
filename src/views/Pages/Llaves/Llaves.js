import React from 'react';
import { Row } from 'reactstrap';
import DataTableState from '../../../context/datatable/DataTableState';
import DataTable from '../../../components/DataTable';
import LlavesModal from './LlavesModal';
import LlavesColumns from './LlavesColumns';

function Llaves() {
  return (
    <div className="animated">
      <Row>
        <DataTableState getAPI="/api/Llaves" 
                       insertAPI="/api/Llaves" 
                       updateAPI="/api/Llaves">
          <LlavesModal>
          </LlavesModal>
          <DataTable columns={LlavesColumns} title="Llaves">
          </DataTable>
        </DataTableState>
      </Row>
    </div>
  )
}

export default Llaves;