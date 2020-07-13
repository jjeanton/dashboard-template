import React, {useReducer} from 'react';
import searchContext from './searchContext';
import searchReducer from './searchReducer';

import clienteAxios from '../../config/axios';
import { GET_TICKET, GET_ERROR } from '../../types';

const SearchState = props => {
    const initialState = {
        ticket: {}
    }

    const [state, dispatch] = useReducer(searchReducer, initialState);

    const getTicket = async (tick) => {
        try {
            const resp = await clienteAxios.get(`/api/Tickets/${tick}`);
            dispatch({
                type: GET_TICKET,
                payload: resp.data,
            })
            
        } catch (error) {
            dispatch({
                type: GET_ERROR
            })
        }
    }

    return(
        <searchContext.Provider
            value={{
                ticket: state.ticket,
                getTicket
            }}
        >
            {props.children}
        </searchContext.Provider>
    )
}

export default SearchState;