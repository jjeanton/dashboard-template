export default () => {
    return [
        {
            Header: 'Boleto',
            accessor: 'Boleto'
        },
        {
            Header: 'Fecha',
            accessor: 'Fecha',
            // Filter: DateRangeColumnFilter
        },
        {
            Header: 'Modulo',
            accessor: 'Modulo',
        },
        {
            Header: 'Tarifa',
            accessor: 'Tarifa',
        },
        {
            Header: 'Adeudo',
            accessor: 'Adeudo',
            disableFilters: true,
        },
        {
            Header: 'Pagado',
            accessor: 'Pagado',
            disableFilters: true,
        },
        {
            Header: 'Descuento',
            accessor: 'Descuento',
            disableFilters: true,
        },
        {
            Header: 'Cupon',
            accessor: 'Cupon',
            disableFilters: true,
        },
    ];
}