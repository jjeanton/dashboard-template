import React from 'react';
import PaginationDataTable from '../../Base/DataTable/_PaginationDataTable';


function ReporteConsolidado() {


    const Columns = [
            {
                Header: '',
                id:"hea",
                disableSortBy: true,
                columns: [
                    {
                        Header: "Boleto",
                        accessor: "Boleto",
                        disableSortBy: true,
                    },
                    {
                        Header: "Folio",
                        accessor: "Folio",
                        disableSortBy: true,
                    }
                ]
            },
            {
                Header: 'Entrada',
                columns: [
                    {
                      Header: "Fecha",
                      accessor: "FechaEntrada",
                      disableSortBy: true,
                      // Filter: DateRangeColumnFilter
                    },
                    {
                      Header: "Tipo",
                      accessor: "TipoEntrada",
                      disableFilters: true,
                      disableSortBy: true,
                    },
                    {
                      Header: "Modulo",
                      accessor: "ModuloEntrada",
                      disableFilters: true,
                      disableSortBy: true,
                    }
                  ]
            },
            {
                Header: 'Cobro',
                columns: [
                    {
                      Header: "Fecha",
                      accessor: "FechaCobro",
                      //Filter: DateRangeColumnFilter,
                      disableFilters: true,
                      disableSortBy: true,
                    },
                    {
                      Header: "Modulo",
                      accessor: "ModuloCobro",
                      disableFilters: true,
                      disableSortBy: true,
                    },
                    {
                      Header: "Adeudo",
                      accessor: "Adeudo",
                      disableFilters: true,
                      disableSortBy: true,
                    },
                    {
                      Header: "Pagado",
                      accessor: "Pagado",
                      disableFilters: true,
                      disableSortBy: true,
                    },
                    {
                      Header: "Descuento",
                      accessor: "Descuento",
                      disableFilters: true,
                      disableSortBy: true,
                    },
                    {
                      Header: "Cambio",
                      accessor: "Cambio",
                      disableFilters: true,
                      disableSortBy: true,
                    },
                    {
                      Header: "Cambio Faltante",
                      accessor: "CambioFaltante",
                      disableFilters: true,
                      disableSortBy: true,
                    }
                  ]
            },
            {
                Header: 'Cupon',
                columns: [
                    {
                      Header: "Fecha",
                      accessor: "FechaCupon",
                      //Filter: DateRangeColumnFilter,
                      disableFilters: true,
                      disableSortBy: true,
                    },
                    {
                      Header: "Modulo",
                      accessor: "ModuloCupon",
                      disableFilters: true,
                      disableSortBy: true,
                    },
                    {
                      Header: "Tipo",
                      accessor: "TipoCupon",
                      disableFilters: true,
                      disableSortBy: true,
                    },
                  ]
            },
            {
                Header: 'Salida',
                columns: [
                    {
                      Header: "Fecha",
                      accessor: "FechaSalida",
                      //Filter: DateRangeColumnFilter,
                      disableFilters: true,
                      disableSortBy: true,
                    },
                    {
                      Header: "Modulo",
                      accessor: "ModuloSalida",
                      disableFilters: true,
                      disableSortBy: true,
                    },
                  ]
            },
        ];

 
  return (

    <PaginationDataTable Columns={Columns} 
    Title="Reporte Consolidado" 
    getAPI="/api/ReporteConsolidado?"
    getCsv="/api/ReporteConsolidado/Csv?"
    FiltroFecha="FechaEntrada">

    </PaginationDataTable>
  )
}

export default ReporteConsolidado;