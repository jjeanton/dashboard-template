import React, {useState} from 'react';
import { Row } from 'reactstrap';
import DataTableState from '../../../context/datatable/DataTableState';
import DataTable from '../../../components/DataTable';
import UsuariosModal from './UsuariosModal';
import UsuariosColumns from './UsuariosColumns';
import UsuariosPasswordModal from './UsuariosPasswordModal';

function Usuarios() {
  const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState();
  const [userId, setUserId] = useState();

  const togglePasswrodModal = (user) => {
    setUserId(user.Id);
    setChangePasswordModalOpen(!isChangePasswordModalOpen);
  }

  const estacionamientosHandler = (user) => {
    console.log(user.Id);
  }

  return (
    <div className="animated">
      <Row>
      <DataTableState getAPI="/api/Usuarios" 
                       insertAPI="/api/Usuarios" 
                       updateAPI="/api/Usuarios">
          <UsuariosModal>
          </UsuariosModal>
          <UsuariosPasswordModal API="/api/Usuarios/ChangePassword" 
            toggleModal={togglePasswrodModal} isModalOpen={isChangePasswordModalOpen} userId={userId} />
          <DataTable columns={UsuariosColumns} columnsHandlers={{togglePasswrodModal, estacionamientosHandler}} title="Usuarios">
          </DataTable>
        </DataTableState>
      </Row>
      </div>
  )
}

export default Usuarios;
