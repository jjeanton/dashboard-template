import React, { useState, useEffect, useContext } from 'react';
import PaginationContext from '../../../context/pagination/PaginationContext';
import { Label, FormGroup, Input } from 'reactstrap';

export default function EntradasFilters() {
    const [sinSalida, setSinSalida] = useState(false);
    const paginationContext = useContext(PaginationContext);
    const { filtros, addFilter } = paginationContext;

    useEffect(() => {
        addFilter({ id: "sinSalida", value: sinSalida, independiente: true });
    }, [sinSalida]);

    useEffect(() => {
        if (filtros === undefined || filtros.length === 0)
        {
            setSinSalida(false);
        }
    }, [filtros]);

    return (
        <FormGroup check inline className="ml-2 mt-2">
            <Label check>
                <Input id="Estatus" type="checkbox" onChange={(e) => setSinSalida(e.target.checked)} checked={sinSalida} />{' '}
              Sin Salida
            </Label>
        </FormGroup>
    )
}