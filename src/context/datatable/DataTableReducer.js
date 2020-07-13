import { GET_DATA, GET_ERROR, TOGGLE_MODAL, MODIFY_MODEL, 
         OPEN_MODAL_UPDATE, OPEN_MODAL_NEW, MODEL_NOT_VALID } from '../../types/DataTableTypes';


export default (state, action) => {
    switch (action.type) {
        case GET_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading
            }
        case GET_ERROR:
            return {
                ...state,
                entradasData: null,
                mensaje: action.payload
            }
        case TOGGLE_MODAL:
            return {
                ...state,
                isModalOpen: !state.isModalOpen,
                isModalUpdate: false,
                modelErrors: {}
            }
        case MODIFY_MODEL:
            return {
                ...state,
                model: action.payload
            };
        case MODEL_NOT_VALID:
            return{
                ...state,
                modelErrors: action.payload
            };
        case OPEN_MODAL_NEW:
            return {
                ...state,
                isModalOpen: true,
                isModalUpdate: false,
                model: {},
                modelErrors: {}
            };
        case OPEN_MODAL_UPDATE:
            return {
                ...state,
                isModalOpen: true,
                isModalUpdate: true,
                model: action.payload,
                modelErrors: {}
            };
        default:
            return state;
    }
}