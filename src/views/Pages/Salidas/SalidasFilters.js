import React, { useState, useEffect, useContext } from 'react';
import PaginationContext from '../../../context/pagination/PaginationContext';
import { Label, FormGroup, Input } from 'reactstrap';

export default function SalidasFilters() {
    const [tolerancia, setTolerancia] = useState(false);
    const paginationContext = useContext(PaginationContext);
    const { filtros, addFilter } = paginationContext;

    useEffect(() => {
        addFilter({ id: "tolerancia", value: tolerancia, independiente: true });
    }, [tolerancia]);

    useEffect(() => {
        if (filtros === undefined || filtros.length === 0)
        {
            setTolerancia(false);
        }
    }, [filtros]);

    return (
        <FormGroup check inline className="ml-2 mt-2">
            <Label check>
                <Input id="Estatus" type="checkbox" onChange={(e) => setTolerancia(e.target.checked)} checked={tolerancia} />{' '}
              En tolerancia
            </Label>
        </FormGroup>
    )
}