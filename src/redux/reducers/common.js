const defaultState = {
    modalMode: false
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
            return {
                ...state,
                modalMode: action.modalMode
            }
        default:
            return state;
    }
}