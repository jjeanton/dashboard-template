import React from 'react'
import { useTable, useSortBy, useFilters, useColumnOrder, usePagination } from 'react-table'
import { motion, AnimatePresence } from 'framer-motion'
import matchSorter from 'match-sorter'
import { Button, Col, Row } from 'reactstrap';


// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data
function Table({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
}) {

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )
  
  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
  }
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )
  const {
    rows,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    useColumnOrder,
    
        // Get the state from the instance
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true,

      pageCount: controlledPageCount,
      manualSortBy: true,
      manualFilters: true
    },
    useFilters,
    useSortBy,
    usePagination
  )
  const spring = React.useMemo(
    () => ({
      type: 'spring',
      damping: 50,
      stiffness: 100,
    }),
    []
  )
  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize, sortBy })
  }, [fetchData, pageIndex, pageSize, sortBy])

  // Render the UI for your table
  
  return (
    <div className="table-responsive">
      <table {...getTableProps()} className="table table-striped table-bordered">
        <thead>
        {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <motion.th
                  {...column.getHeaderProps({
                    layoutTransition: spring,
                    style: {
                      minWidth: column.minWidth,
                    },
                  })}
                >
                  <div {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? <i className="fa fa-sort-down">  </i>
                          : <i className="fa fa-sort-up">  </i>
                        : <i className="fa fa-sort">  </i>}
                  </div>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </motion.th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        <AnimatePresence>
            {rows.slice(0, 10).map((row, i) => {
              prepareRow(row)
              return (
                <motion.tr
                  {...row.getRowProps({
                    layoutTransition: spring,
                    exit: { opacity: 0, maxHeight: 0 },
                  })}
                >
                  {row.cells.map((cell, i) => {
                    return (
                      <motion.td
                        {...cell.getCellProps({
                          layoutTransition: spring,
                        })}
                      >
                        {cell.render('Cell')}
                      </motion.td>
                    )
                  })}
                </motion.tr>
              )
            })}
          </AnimatePresence>
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination ">
        <div className="btn-group mr-2">
        <button className="btn btn-success" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button className="btn btn-success" onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button className="btn btn-success" onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button className="btn btn-success" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        </div>

        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

class DataTable extends React.Component {
  state = {data:[], loading: false, pageCount: 0};



  async fetchData ({ pageSize, pageIndex, sortBy })
  {
    let res = await this.props.fetchData({ pageSize, pageIndex, sortBy });
    console.log(res);

    this.setState({data: res.data,
      pageCount: Math.ceil(res.totalCount / pageSize)
    });
  }

  render(){
    return (
      <Table
          columns={this.props.state.columns}
          data={this.props.data}
          fetchData={this.props.fetchData}
          loading={this.state.loading}
          pageCount={this.state.pageCount}
        />
    );
  }
  
}

export default DataTable