import * as types from './actionTypes';

export const updateLoading = (data) => {
    return {
        type: types.UPDATE_LOADING,
        data,
    }
}