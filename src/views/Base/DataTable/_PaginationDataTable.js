import React, {useState, useEffect} from 'react';
import {
    Card, CardBody, CardHeader, Col, Row, Button, Input
  } from 'reactstrap';
import moment from 'moment';
import clienteAxios from '../../../config/axios';
import CsvExport from "./CsvExport";
import { DateRangePicker } from 'rsuite';
import _PaginationTable from './_PaginationTable';

function PaginationDataTable(props) {
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState([]);
    const [filtros, setFiltros] = useState([]);
    const [datevalue, setDatevalue] = useState([]);
    const [csvData, setCsvData] = useState([]);

    const fetchData = React.useCallback(async ({ pageSize, pageIndex, sortBy, filters, filtros }) => {
        let params = {
            Limit: pageSize,
            Skip: pageIndex,
        }
        console.log(filtros);

        let filterers = "";
        if (filters.length > 0)
        {
          filters.forEach(f => {
            if (Array.isArray(f.value))
            {
              
              filterers = filterers + `&${encodeURIComponent(f.id)}=${encodeURIComponent(moment(f.value[0]).startOf('day').unix())},${encodeURIComponent(moment(f.value[1]).endOf('day').unix())}`
            }
            else{
              filterers = filterers + `&${encodeURIComponent(f.id)}=${encodeURIComponent(f.value)}`
            }
          });
        }
        const resp = await clienteAxios.get(props.getAPI + new URLSearchParams(params) + filterers);

        setData(resp.data.data);
        setPageCount(resp.data.totalPages);
        
        return {data: resp.data.data, totalPages: resp.data.totalPages };
       }, []);

    useEffect(() => {
      if (props.filtros && props.filtros.length > 0)
      {
        setFiltros(filtros.concat(props.filtros));
      }
    }, [props.filtros])

    const fetchCsv = async () => {
      let filterers = "";
        if (filtros.length > 0)
        {
          filtros.forEach(f => {
            if (Array.isArray(f.value))
            {
              filterers = filterers + `${encodeURIComponent(f.id)}=${encodeURIComponent(moment(f.value[0]).startOf('day').unix())},${encodeURIComponent(moment(f.value[1]).endOf('day').unix())}`
            }
            else{
              filterers = filterers + `${encodeURIComponent(f.id)}=${encodeURIComponent(f.value)}`
            }
          });
        }
      const resp = await clienteAxios.get(props.getCsv + filterers);
      return {data: resp.data, filename: props.Title + ".csv"};
    };

    const columns = React.useMemo(
        () => props.Columns,
        []
      );
    
    const changeDatePicker = (value) => {
      setFiltros([...filtros, {id:(props.FiltroFecha === undefined) ? 'Fecha' : props.FiltroFecha, value: value}]);
      setDatevalue(value);
    }
  
    const clearFilters = () => {
      setFiltros([]);
      setDatevalue([]);
    }

  return (
    <div className="animated fadeIn">
     <Row>
       <Col xl={12}>
         <Card>
           <CardHeader className="justify-content-between">
             <i className="fa fa-align-justify"></i> {props.Title}
           </CardHeader>
           <CardBody>
           <DateRangePicker 
           onChange={value => changeDatePicker(value) } 
           onClean={() => clearFilters() }
           value={datevalue}/>
           <CsvExport asyncExportMethod={fetchCsv}
           >

           </CsvExport>
           {props.children}

           <Button className="btn-md btn-success float-right mb-3" onClick={() => clearFilters()}>Limpiar Filtros</Button>

    <_PaginationTable
        columns={columns}
        data={data}
        fetchData={fetchData}
        pageCount={pageCount}
        filtros={filtros}
      />
           </CardBody>
         </Card>
       </Col>
     </Row>
   </div>
  )
}

export default PaginationDataTable;