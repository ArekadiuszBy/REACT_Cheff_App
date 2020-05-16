import axios from 'axios'
import {URL} from '../consts/firebase'
import {circuralProgress} from './fullScreenCircuralProgress'
import {addSnackbar} from './snackbars'

export const addRecipeAsyncActionCreator = form => (dispatch, getState) => {
    dispatch(circuralProgress.add())
    //return, by po wprowadzeniu niepoprawnych danych i kliknięcia
    //Zapisz, by dane się nie kasowały z pól formularza
    return axios.post(URL+'recipes.json', form )      //tworzymy pole 'recipes' w Firebase
    .then(()=>{
        dispatch(circuralProgress.remove())
        dispatch(addSnackbar('Dodano przepis'))
    })
    .catch(() => {
        dispatch(circuralProgress.remove())
        dispatch(addSnackbar('Dodawanie nie powiodło się, spróbuj ponownie', 'red')) //wyświetlanie na czerwono
        //zabezpieczenie przed błędem, bo .then w AddRecipe wykona się po .catch
        return Promise.reject()   
    })
}

const initialState = {

}

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}