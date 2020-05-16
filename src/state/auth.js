import axios from 'axios'
import {SING_UP_URL} from '../consts/firebase'
import {circuralProgress} from './fullScreenCircuralProgress'
import {addSnackbar} from './snackbars'
const SAVE_USER = 'auth/SAVE_USER'

//funkcja pomocnicza do różnych błędów przy rejestracji
//
const getSnackbarText = (string) => {
    switch (string){
        case 'EMAIL_EXISTS':
            return 'Ten mail jest już zajęty'
            default:
                return 'Coś poszło nie tak! Spróbuj ponownie'
    }
}

export const registerAsyncActionCreator  = (email, password) => (dispatch, getState) => {
dispatch(circuralProgress.add())            //kółko ładowania
axios.post(SING_UP_URL, {
    email,
    password
})
.then(response => {     //jak się powiedzie
    const {idToken, refreshToken, localId} = response.data
    dispatch(saveUserActionCreator(idToken, refreshToken, localId))
})          

.catch(error => {           //jak się nie powiedzie (zły mail, istniejacy mail)
    const text = getSnackbarText(error.response.data.error.message)
    dispatch(addSnackbar(text,'red'))
})
.finally(() => dispatch(circuralProgress.remove()))  //zawsze sie wykona
}
 
const saveUserActionCreator = (idToken, refreshToken, userId) => {
    localStorage.setItem('refreshToken', refreshToken)
    return {
        type: SAVE_USER,
        idToken,
        userId
    }
}
const initialState = {
    isLogged: false,  //na początku nie jesteśmy zalogowani
    idToken: null,
    userId: null

}

export default (state = initialState, action) => {
    switch (action.type){
        case SAVE_USER:
            return{
            ...state,
            isLogged:true,
            idToken: action.idToken,
            userId: action.userId
            }
        default:
            return state
    }
}