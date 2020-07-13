import React from 'react';
import { Col, Row } from 'reactstrap';
import drilldown from 'highcharts/modules/drilldown';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
drilldown(Highcharts);

const ProfitsHightComponent = () => {
    const options = {
        chart: {
            type: 'column',
            events: {
                drilldown: function(e) {
                    // this.xAxis[0].setTitle({ text: e.seriesOptions.name });
                }
            }
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Ingresos Mensuales'
        },
        subtitle: {
            text: 'E-Control | SGE'
        },
        xAxis: {
            type: "category",
          },
        // xAxis: {
        //     categories: [
        //         'Jan',
        //         'Feb',
        //         'Mar',
        //         'Apr',
        //         'May',
        //         'Jun',
        //         'Jul',
        //         'Aug',
        //         'Sep',
        //         'Oct',
        //         'Nov',
        //         'Dec'
        //     ],
        //     crosshair: true
        // },
        yAxis: {
            min: 0,
            title: {
                text: 'Ingresos (MXN)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>$ {point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        // plotOptions: {
        //     column: {
        //         pointPadding: 0.2,
        //         borderWidth: 0
        //     }
        // },
        series: [{
            name: 'Modulo 21',
            // data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
            data:[
            {
                name:'Junio',
                id: 'jun',
                y:49.9,
                drilldown:'module1-jan',
            },
            {
                name:'Julio',
                y:68.5,
                drilldown:'module1-jan',
            },
            // 20,30,50
        ]
            // drilldown:'jan'
    
        }, {
            name: 'Modulo 22',
            // data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3],
            data:[{
                name:'Junio',
                y:83.6,
                drilldown:'module2-jan'
            },
            
        ]
            // drilldown:'module-2'
    
        }, 
        // {
        //     name: 'Modulo 11',
        //     data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2],
        //     drilldown:'module-11'
    
        // }, {
        //     name: 'Modulo 12',
        //     data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1],
        //     drilldown:'module-12'
    
        // }
    ],
    drilldown: {
            allowPointDrilldown: true,
            activeDataLabelStyle: {
                color: 'white',
                textShadow: '0 0 2px black, 0 0 2px black'
            },
            categories:['Lun-01', 'Mar-02', 'Mie-03', 'Jue-04'],
            series: [
                {
                    id: 'module1-jan',
                    name:'Modulo 1',
                    data: [
                        ['Lun-01',10],
                        ['Mar-02', 3],
                        ['Mie-03',11],
                        ['Jue-04', 8]
                        ]
                },
                {
                    name: 'Modulo 2',
                    id: 'module2-jan',
                    data: [['Mar-02',20], ['Mie-03',15], ['Jue-04',17], ['Vie-05',10]]
                }
            ]
        }
    };
    return ( 
        <Row>
          <Col>
            <HighchartsReact 
                highcharts={Highcharts}
                options={options}
            />
          </Col>
        </Row>
     );
}
 
export default ProfitsHightComponent;