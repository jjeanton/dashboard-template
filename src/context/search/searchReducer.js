
import { GET_TICKET, GET_ERROR } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case GET_TICKET:
            
            return {
                ...state,
                ticket: action.payload.ticket
            }
    
        case GET_ERROR:
            return{
                ...state,
                entradasData: null,
                mensaje: action.payload
            }
        default:
            return state;
    }

}