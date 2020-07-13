import React, { useState, Fragment } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { DateRangePicker } from 'rsuite';
import {
    Button,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Col,
    Progress,
    Row,
} from 'reactstrap';

const brandSuccess = getStyle('--success');

const ProfitsComponent = () => {

    const [datevalue,setDatevalue] = useState([new Date(), new Date()]);
    const [radioSelected, saveRadioSelected] = useState({
        id:'today', value:'today', name:'Hoy', shape:'Ultimas 24h'
      });
      const[menuopt, saveMenuopt] = useState([
        {id:'today', value:'today', name:'Hoy', shape:'Ultimas 24h'},
        {id:'week', value:'week', name:'Semana', shape:'Ultima semana'},
        {id:'month', value:'month', name:'Mes', shape:'Ultimo mes'}
      ]);
    const [bar, setBar] = useState({
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: 'My First dataset',
                backgroundColor: hexToRgba(brandSuccess, 30),
                borderColor: brandSuccess,
                borderWidth: 1,
                // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                // hoverBorderColor: 'rgba(255,99,132,1)',
                pointHoverBackgroundColor: '#fff',
                data: [65, 59, 80, 81, 56, 55, 40],
              },
            ],
    });
    const [options, setOptions] = useState({
        tooltips: {
            enabled: false,
            custom: CustomTooltips
          },
          maintainAspectRatio: false
    });

    const onRadioBtnClick = () => {

    }

    const onChageRange = () => {

    }
    return (
        <Fragment>
            <Row className="mb-3">
                    <Col className="d-none d-sm-inline-block">
                        <ButtonToolbar className="float-left" aria-label="Toolbar with button groups">
                            <ButtonGroup className="mr-3" aria-label="First group">
                            {menuopt.map(option => (
                            <Button key={option.value} color="outline-secondary" onClick={() => onRadioBtnClick(option)} active={radioSelected.value === option.value}>{option.name}</Button>

                            ))}
                            </ButtonGroup>
                        </ButtonToolbar>
                        <DateRangePicker onChange={value => onChageRange(value)} value={datevalue} className="float-left" showOneCalendar/>
                    </Col>
                </Row>
            <Row>
                <Col>
                    <Card>
                    <CardBody>
                        <Row>
                        <Col sm="5">
                            <CardTitle className="mb-0">Estacionamiento</CardTitle>
                            <div className="small text-muted">{radioSelected.shape}</div>
                        </Col>
                        {/* <Col sm="7" className="d-none d-sm-inline-block">
                            <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button>
                            <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                            <ButtonGroup className="mr-3" aria-label="First group">
                            {menuopt.map(option => (
                                <Button key={option.value} color="outline-secondary" onClick={() => onRadioBtnClick(option)} active={radioSelected.value === option.value}>{option.name}</Button>

                            ))}
                            </ButtonGroup>
                            </ButtonToolbar>
                        </Col> */}
                        </Row>
                        <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                        <Bar data={bar} options={options} height={300} />
                        </div>
                    </CardBody>
                    </Card>
                </Col>

            </Row>
        </Fragment>

     );
}
 
export default ProfitsComponent;