// reduxStore.js
import { createStore } from 'redux';

// Khởi tạo trạng thái ban đầu
const initialState = {
    globalVariable: false,
};

// Reducer xử lý các action để cập nhật trạng thái
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GLOBAL_VARIABLE':
            return { ...state, globalVariable: action.payload };
        default:
            return state;
    }
};

// Tạo Redux store
const store = createStore(reducer);

export default store;
