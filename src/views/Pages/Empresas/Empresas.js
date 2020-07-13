import React from 'react';
import { Row } from 'reactstrap';
import DataTableState from '../../../context/datatable/DataTableState';
import DataTable from '../../../components/DataTable';
import EmpresasModal from './EmpresasModal';
import EmpresasColumns from './EmpresasColumns';

function Empresas() {
  return (
    <div className="animated">
      <Row>
        <DataTableState getAPI="/api/Empresas" 
                       insertAPI="/api/Empresas" 
                       updateAPI="/api/Empresas">
          <EmpresasModal>
          </EmpresasModal>
          <DataTable columns={EmpresasColumns} title="Empresas">
          </DataTable>
        </DataTableState>
      </Row>
    </div>
  )
}

export default Empresas;