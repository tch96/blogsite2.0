const defaultState = {
    modalMode: false,
    subsModalMode: false,
    subs: false,
    subTo: false
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
            return {
                ...state,
                modalMode: action.modalMode
            }
        case 'TOGGLE_SUBS_MODAL':
            return {
                ...state,
                subsModalMode: action.subsModalMode,
                subs: action.subs,
                subTo: !action.subs
            }
        default:
            return state;
    }
}