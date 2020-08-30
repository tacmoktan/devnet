const initialState = {
    isDark: false
}

export default function (state = initialState, action) {
    
    switch (action.type) {

        case 'TOGGLE_DARK_MODE':
            return {
                isDark: !state.isDark
            }

        default:
            return state;
    }
}