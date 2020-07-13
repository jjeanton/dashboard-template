import React from 'react'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import { motion, AnimatePresence } from 'framer-motion'
import matchSorter from 'match-sorter'
import EstatusColumnFilter from './Filters'

function Table({
  columns,
  data,
  fetchData,
  loading
}) {
console.log(columns);
  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
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
      estatus: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? rowValue === filterValue
            : true
        })
      }
    }),
    []
  )
  
  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
  }

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  )
  const {
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
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    // useSortBy,
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
  React.useEffect(() => {
    fetchData()
  }, [fetchData])

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
                  <div > {/*  {...column.getSortByToggleProps()} */}
                    {column.render('Header')}
                      {/* {column.canSort ? column.isSorted
                        ? column.isSortedDesc
                          ? <i className="fa fa-sort-down">  </i>
                          : <i className="fa fa-sort-up">  </i>
                        : <i className="fa fa-sort">  </i>
                      : <i></i>} */}
                  </div>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </motion.th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        <AnimatePresence>
            {page.map((row, i) => {
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
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

function SimpleDataTable(props) {
  const columns = React.useMemo(
    () => props.columns,
    []
  )

  const [loading, setLoading] = React.useState(false)

   const fetchData = React.useCallback(async () => {
     await props.fetchData();    
   }, [])

  return (
    <Table
        columns={columns}
        data={props.data}
        fetchData={fetchData}
        loading={loading}
      />
  )
}

export default SimpleDataTable