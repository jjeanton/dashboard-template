import React, { useContext, useState } from 'react';
import DataTableContext from '../context/datatable/DataTableContext';
import SimpleDataTable from '../views/Base/DataTable/SimpleDataTable';
import {
    Card, CardBody, CardHeader, Col, Button
  } from 'reactstrap';

const UsuariosDataTable = (props) => {
    const dataTableContext = useContext(DataTableContext);
    const { data, getData, openModalNew, openModalUpdate } = dataTableContext;
    const [columns, setColumns] = useState();
    
    if (!columns)
    {
      setColumns(props.columns(openModalUpdate, props.columnsHandlers));
    }

    return ( 
        <Col xl={12}>
        <Card>
          <CardHeader className="justify-content-between">
            <i className="fa fa-align-justify"></i> {props.title}
            <Button className="btn-sm btn-success float-right" onClick={openModalNew}>Nuevo</Button>
          </CardHeader>
          <CardBody>
            <SimpleDataTable columns={columns} 
            fetchData={getData}
            data={data}
            >
            </SimpleDataTable>
          </CardBody>
        </Card>
      </Col>
    );
}
 
export default UsuariosDataTable;