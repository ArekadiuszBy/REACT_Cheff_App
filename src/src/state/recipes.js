import axios from 'axios'
import {URL} from '../consts/firebase'      //.. - cofniecie o 1 poziom do góry
import {circuralProgress} from './fullScreenCircuralProgress'
import {addSnackbar} from './snackbars'
import mapObjectToArray from '../utilities/mapObjectToArray'

const SAVE_RECIPES = 'recipes/SAVE_RECIPE'
const ERROR_ON_GET = 'recipes/ERROR_ON_GET'

export const addRecipeAsyncActionCreator = form => (dispatch, getState) => {
    dispatch(circuralProgress.add())                    //add kółko ładowania
    //return, by po wprowadzeniu niepoprawnych danych i kliknięcia
    //Zapisz, by dane się nie kasowały z pól formularza
    return axios.post(URL+'recipes.json', form )      //tworzymy pole 'recipes' w Firebase
    .then(()=>{
        dispatch(circuralProgress.remove())             //remove kółko ładowania
        dispatch(addSnackbar('Dodano przepis'))
    })
    .catch(() => {
        dispatch(circuralProgress.remove())
        dispatch(addSnackbar('Dodawanie nie powiodło się, spróbuj ponownie', 'red')) //wyświetlanie na czerwono
        //zwracanie błędu, zabezpieczenie przed błędem, bo .then w AddRecipe wykona się po .catch
        return Promise.reject()     
    })
}

export const getRecipesAsyncActionCreator = () => (dispatch, getState) => {
       dispatch(circuralProgress.add())
        axios.get(URL + 'recipes.json')
        .then((response) => {                            //przechwytywanie danych
        const mappedData = mapObjectToArray(response.data)
        dispatch(saveRecipesActionCreator(mappedData))   //pobieranie danych
        dispatch(circuralProgress.remove())         
    })            
    //obsługa błędu przy pobieraniu przepisu
    .catch(() => {
        dispatch(circuralProgress.remove()) 
        dispatch(errorOnGetRecipesActionCreator())
    })
}

const saveRecipesActionCreator = recipes => ({
    type: SAVE_RECIPES,
    recipes
})

const errorOnGetRecipesActionCreator = () => ({type: ERROR_ON_GET})

const initialState = {
recipes:[],
isError: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SAVE_RECIPES:          //obsługa SAVE_RECIPES w redux'erze
            return {               
                ...state,           //zapisywanie starego stanu
                isError: false,     //brak błędu podczas pobierania
                recipes: action.recipes     //nadpisywanie tego co nam przyjdzie w akcji
            }
            case ERROR_ON_GET:
                return {
                    ...state,
                    isError: true
                }

        default:
            return state
    }
}