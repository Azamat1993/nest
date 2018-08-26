import * as types from './types';

const initialState = {
    items: {}
}

const history = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.SET_HISTORY_ITEM:
            const {payload: {device_id}} = action;
            const newItems = Object.assign({}, state.items);
            if (!newItems[device_id]) {
                newItems[device_id] = [];
            }
            action.payload.createdAt = new Date();
            newItems[device_id].unshift(action.payload);
            return Object.assign({}, state, {
                items: newItems
            })
        default:
            return state;
    }
}

export default history;
