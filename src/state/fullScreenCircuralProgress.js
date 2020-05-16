// When loading circle have to show up
const ADD_CIRCURAL = 'fullScreenCircuralProgress/ADD_CIRCURAL'
const REMOVE_CIRCURAL = 'fullScreenCircuralProgress/REMOVE_CIRCURAL'


const addCricuralActionCreator = () => ({type: ADD_CIRCURAL})  //funkcja zwracająca typ
const removeCircuralActionCreator = () => ({type:REMOVE_CIRCURAL})


export const circuralProgress = {       //ułatwienie importowania metod ADD i REMOVE w innych plikach
    add: addCricuralActionCreator,
    remove: removeCircuralActionCreator
}

const initialState = {
circurals: []       //tworzymy i usuwamy elementy
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_CIRCURAL:
            return {
                ...state, // ... - split operator, by niczego nie zgubić
                circurals: [...state.circurals, true]  //dodajemy element
            }

            case REMOVE_CIRCURAL:
                return {
                    ...state, 
                    circurals: state.circurals.filter((el, index) => index !== 0)  //usuwamy wszystko, poza 1. elementem
                }
        default:
            return state
    }
}