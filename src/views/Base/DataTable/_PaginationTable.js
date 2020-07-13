import React, {useState, useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { DefaultColumnFilter } from './Filters'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'

export default function Table({
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
    filtros
  }) {
  
    const defaultColumn = React.useMemo(
      () => ({
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
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      setAllFilters,
      setFilter,
      state: { pageIndex, pageSize, sortBy, filters },
    } = useTable(
      {
        columns,
        data,
        defaultColumn,
        initialState: { pageIndex: 0 }, // Pass our hoisted table state
        manualPagination: true,
        pageCount: controlledPageCount,
        // manualSortBy: true,
        manualFilters: true
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
    // Listen for changes in pagination and use the state to fetch our new data
    React.useEffect(() => {
      fetchData({ pageIndex, pageSize, sortBy, filters, filtros })
    }, [fetchData, pageIndex, pageSize, sortBy, filters, filtros])
  

    React.useEffect(() => {
      if (filtros === undefined || filtros.length == 0) {
        setAllFilters([]);
        return;
      }
      filtros.forEach(function(value) {
        if (value.independiente === undefined)
        {
          setFilter(value.id, value.value);
        }
      }); 
      // setAllFilters(filtros);
      
    }, [filtros])
  
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
                    <div >
                    {/* {...column.getSortByToggleProps()} */}
                      {column.render('Header')}
                      {/* {column.canSort ?
                       column.isSorted
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
              {rows.slice(0, pageSize).map((row, i) => {
                prepareRow(row)
                return (
                  <motion.tr
                    {...row.getRowProps({
                      layoutTransition: spring,
                      exit: { opacity: 1, maxHeight: 0 },
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