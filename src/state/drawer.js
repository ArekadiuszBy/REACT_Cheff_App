//Połączenie Drawera z AppBarem za pomocą reduxa
const DRAWER_OPEN = 'drawer/OPEN'
const DRAWER_CLOSE = 'drawer/CLOSE'

export const openDrawerActionCreator = () => ({type: DRAWER_OPEN})
export const closeDrawerActionCreator = () => ({type: DRAWER_CLOSE})

const initialState = {
    isOpen: true

}

export default (state = initialState, action) => {
    switch (action.type) {
        case DRAWER_OPEN:
            return {
                ...state,  //... - zwracamy wszystko co jest w state
                isOpen: true
            }
        case DRAWER_CLOSE:
            return {
                ...state,
                isOpen: false
            }
        default:
            return state
    }
}