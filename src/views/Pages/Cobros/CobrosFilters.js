import React, { useState, useEffect, useContext } from 'react';
import PaginationContext from '../../../context/pagination/PaginationContext';
import { Label, FormGroup, Input } from 'reactstrap';

export default function CobrosFilters() {
    const [cortesia, setCortesia] = useState(false);
    const paginationContext = useContext(PaginationContext);
    const { filtros, addFilter } = paginationContext;

    useEffect(() => {
        addFilter({ id: "cortesia", value: cortesia, independiente: true });
    }, [cortesia]);

    useEffect(() => {
        if (filtros === undefined || filtros.length === 0)
        {
            setCortesia(false);
        }
    }, [filtros]);

    return (
        <FormGroup check inline className="ml-2 mt-2">
            <Label check>
                <Input id="Estatus" type="checkbox" onChange={(e) => setCortesia(e.target.checked)} checked={cortesia} />{' '}
              Cortesia
            </Label>
        </FormGroup>
    )
}