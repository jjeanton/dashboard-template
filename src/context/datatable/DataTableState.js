import React, {useReducer} from 'react';
import dataTableContext from './DataTableContext';
import dataTableReducer from './DataTableReducer';

import clienteAxios from '../../config/axios';

import { GET_DATA, GET_ERROR, TOGGLE_MODAL, MODIFY_MODEL, OPEN_MODAL_NEW, 
    OPEN_MODAL_UPDATE, MODEL_NOT_VALID } from '../../types/DataTableTypes';

const DataTableState = props => {
    const initialState = {
        data: [],
        loading: true,
        isModalOpen: false,
        isModalUpdate: false,
        model: {},
        modelErrors: {},
        pageSize: 10
    }

    const [state, dispatch] = useReducer(dataTableReducer, initialState);

    const getData = async () => {
        try {
            const resp = await clienteAxios.get(props.getAPI);
            dispatch({
                type: GET_DATA,
                payload: resp.data,
                loading: false,
            })
            
        } catch (error) {
            dispatch({
                type: GET_ERROR
            })
        }
    }

    const editData = async (validateModel, convertModel) => {
        try {
            let modelErrors = validateModel(state);

            if (modelErrors && !isEmpty(modelErrors))
            {
                dispatch({
                    type: MODEL_NOT_VALID,
                    payload: modelErrors
                });
                return;
            }

            let model = {};
            if (convertModel)
            {
                model = convertModel(state.model);
            }
            else
            {
                model = state.model;
            }

            if (!state.isModalUpdate)
            {
                // New
                await clienteAxios.post(props.insertAPI, model);
            } else {
                // Update
                await clienteAxios.put(props.updateAPI, model);
            }

            dispatch({
                type: TOGGLE_MODAL
            })
            loadData(state.pageSize);
        } catch (error) {
            dispatch({
                type: GET_ERROR
            })
        }
    }
    const toggleModal = () => {
        dispatch({
            type: TOGGLE_MODAL
        })
    }

    const modifyModel = (key, value) => {
        let _model = state.model;
        _model[key] = value;
        dispatch({
            type: MODIFY_MODEL,
            payload: _model
        });
    }

    const openModalNew = () => {
        dispatch({
            type: OPEN_MODAL_NEW,
        });
    }

    const openModalUpdate = async (model) =>
    {
        dispatch({
            type: OPEN_MODAL_UPDATE,
            payload: model
        });
    }

    const updatePageSize = (pageSize) => {
        state.pageSize = pageSize;
    }

    const loadData = async () => {
        await getData(state.pageSize);
    }

    return (
        <dataTableContext.Provider
            value={{
                data: state.data,
                loading: state.loading,
                model: state.model,
                modelErrors: state.modelErrors,
                isModalOpen: state.isModalOpen,
                isModalUpdate: state.isModalUpdate,
                getData,
                editData,
                toggleModal,
                openModalNew,
                openModalUpdate,
                modifyModel,
                updatePageSize,
                loadData
            }}
        >
            {props.children}
        </dataTableContext.Provider>
    )
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export default DataTableState