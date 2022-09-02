import * as types from './actionTypes';


const initialState = {
    "loading": false,
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case types.UPDATE_LOADING:
            return {
                ...state,
                "loading": action.data
            };
        default:
            return state;

    }
};

export default reducer;