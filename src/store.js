//middleware wchodzi pomiędzy akcje, a reducery
//- jeśli sprawdzi to co przekazujemy do dispatcha to obiekt,
// to puszcza go dalej do reducera
// ALE jeżeli dispatch'uje się funkcje, to redux nie puści nam
//ja do reducera, tylko ją zatrzyma i wywoła


import { createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import fullScreenCircuralProgress from  './state/fullScreenCircuralProgress'
import snackbars from './state/snackbars'
import drawer from './state/drawer'
import recipes from './state/recipes'
import auth from './state/auth'


const reducer = combineReducers({
    fullScreenCircuralProgress,
    snackbars,
    drawer,
    recipes,
    auth
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export const store = createStore(
reducer,
composeEnhancers(
    applyMiddleware(thunk)  //użycie middleware Redux thunk - wzbogacaja działanie programu
    )
)