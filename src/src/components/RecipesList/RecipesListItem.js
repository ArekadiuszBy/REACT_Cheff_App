//Dla pojedynczego itemu
import React from 'react'

import imgPlaceholder from '../../img/img-placeholder.jpg'  //obrazek schaboszczaka, gdy nie załaduje nam się obrazek normalnie
import { Typography } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'  //ikonka czasu

const styles={
    container: {
        position: 'relative', width: 220, height: 220, margin: 7,
        cursor: 'pointer', overflow: 'hidden'           //overflow (to co jest poza kwadratem obrazka zostanie ukryte)
    },
    img: {
        height: '100%', minWidth: '100%',               //min, bo obrazki mogą mieć różny rozmiar, a by wyświetlały się tak samo
        backgroundImage: 'url('+ imgPlaceholder  + ')',         //zanim wczyta się normalny obraz przepisu, to wstawi się schaboszczak
        backgroundSize: 'cover', backgroundPosition: 'center',  
        transition: '500ms'                                //płynny efekt przejścia (przybliżenia)
    },
    description: {
        position:'absolute', bottom: 0, height:'40%',       //pozycja absolutna względem container'a
        width:'100%', backgroundColor: 'rgba(0,0,0,0.4)'    //kolor prześwitujący 
    },
    title: { color: 'white', marginLeft: 20, marginTop:15, fontWeight: 'bold' },
    timeDiv:{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', color: 'lightgreen'},
    timeIcon: { width: 17, color: 'white' },
    subtitle: { color:'white', fontSize: 14, marginLeft: 3, marginRight: 15 }
}

const RecipesListItem = props => {
    return(
        <div
        style={styles.container}
        onClick={() => {
            props.changeRoute(props.route + '/' + props.data.key)
            //Gdy przewiniemy jeden przepis na dół, a potem kliniemy inny przepis
            //By nie zostało na dole i nam przewinęło do góry 
            window.scrollTo({   
                top:0,
                behavior:'smooth'
            })
        }}
        >
           <img
           style={styles.img}
           className={'recipe-list-item__img'}
           src={props.data.photo}       //obraz przepisu
           alt={props.data.name}        //nazwa przepisu
           onError={evt => evt.target.src = imgPlaceholder}     //schabowy, gdy obraz się nie wczyta
           />
            <div
            style={styles.description}
            >                           
                <Typography             //importowanie nazwy i czasu
                    style={styles.title}
               >
                   {props.data.name     //ścieżka: UserRecipes.js -> RecipesList.js -> RecipesListItem.js i odwołanie do wartości danego obiektu
                   }       
                   </Typography>    
                   <div style={styles.timeDiv}      //div do czasu
                   >     
                   <AccessTimeIcon  style={styles.timeIcon}/>
                   <Typography
                        styles={styles.subtitle}
                   >
                       {props.data.time}min
                   </Typography>
                   </div>      
            </div>

        </div>
    )
}

export default RecipesListItem