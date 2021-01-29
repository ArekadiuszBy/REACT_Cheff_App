import axios from 'axios'

import {SING_IN_URL, SING_UP_URL, RESET_PASSWORD_URL} from '../consts/firebase'

import {circuralProgress} from './fullScreenCircuralProgress'
import {addSnackbar} from './snackbars'

const SAVE_USER = 'auth/SAVE_USER'
const LOG_OUT = 'auth/LOG_OUT'

//funkcja pomocnicza do różnych błędów przy rejestracji
//
const getSnackbarText = (string) => {
    switch (string){
        case 'EMAIL_EXISTS':
            return 'Ten mail jest już zajęty'
            case 'OPERATION_NOT_ALLOWED':
                return 'To hasło jest niedozwolone'
            case 'EMAIL_NOT_FOUND':
                return 'Złe hasło lub email'
            case 'INVALID_PASSWORD':
            return 'Złe hasło lub email'
            case 'USER_DISABLED':
                return 'To konto jest zablokowane'
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
    const text = getSnackbarText(
        //zabezpieczenie przed undefined i innymi błędami
        error.response.data && 
        error.response.data.error &&
        error.response.data.error.message       
        )
    
    dispatch(addSnackbar(text,'red'))
})
.finally(() => dispatch(circuralProgress.remove()))  //zawsze sie wykona
}

export const logInAsyncActionCreator = (email, password) => (dispatch, getState) => {
    dispatch(circuralProgress.add())
    axios.post(SING_IN_URL, {
        email,
        password, 
        returnSecureToken: true
    })
    .then(response => {
        const {idToken, refreshToken, localId} = response.data
        dispatch(saveUserActionCreator(idToken, refreshToken, localId))
    })
    .catch(error => {          
        const text = getSnackbarText(
            error.response.data && 
            error.response.data.error &&
            error.response.data.error.message       
            )
        dispatch(addSnackbar(text, 'red'))
    })
    .finally(() => dispatch(circuralProgress.remove()))
}
 
export const resetPasswordAsyncActionCreator = (email, success) => (dispatch, getState) => {
    dispatch(circuralProgress.add())
    axios.post(RESET_PASSWORD_URL, {
        email,
        requestType: 'PASSWORD_RESET'
    })
    .then(() => {
        dispatch(addSnackbar('Wysłano prośbę o reset'))
        success()       //zwijanie "Przywróć hasło" po wysłaniu prośby
    })
    .catch(error => {          
        dispatch(addSnackbar('Użytkownik nie istnieje', 'red'))
    })
    .finally(dispatch(circuralProgress.remove()))
}

export const logOutActionCreator = () => {
    localStorage.removeItem('refreshToken')
    return {
        type: LOG_OUT
    }
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
            case LOG_OUT:
                return {
                    ...state,
                    isLogged: false,
                    idToken: null,
                    userId: null
                }
        default:
            return state
    }
}