import React from 'react'
import { DateRangePicker } from 'rsuite';
import moment from 'moment';

export default function EstatusColumnFilter({
    column: { filterValue, setFilter, id },
  }) {
    return (
      <select
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">Todos</option>
        <option value="true">Activos</option>
        <option value="false">Inactivos</option>
      </select>
    )
  }

    
  export function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length
  
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
        placeholder={`Filtrar...`}
      />
    )
  }

  export function DateRangeColumnFilter({
    column: { filterValue, setFilter },
  }) {
    return (
      <DateRangePicker appearance="default" value={filterValue} onChange={(e) => setFilter(e || undefined)} onClean={(e) => setFilter(undefined)}
                placeholder="Filtrar..."
                ranges={[
                  {
                    label: 'Hoy',
                    value: [new Date(), new Date()]
                  },
                  {
                    label: 'Ayer',
                    value: [moment().subtract(1, 'days').toDate(), moment().subtract(1, 'days').toDate()]
                  },
                  {
                    label: 'Semana',
                    value: [moment().subtract(7, 'days').toDate(), moment().toDate()]
                  },
                  {
                    label: 'Mes',
                    value: [moment().subtract(1, 'months').toDate(), moment().toDate()]
                  }
                ]}/>
    )
  }