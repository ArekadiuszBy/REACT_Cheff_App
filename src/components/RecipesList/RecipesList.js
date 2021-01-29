//Dla całej tablicy
import React from 'react'
import RecipesListItem from './RecipesListItem'

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',           //by obrazki od przepisów się zawijały 
        justifyContent: 'center',
        maxWidth: 800,              //max 3 obrazki od przepisów w linii
        margin: 'auto'
    },
}

const RecipesList = props => {
    return(
        <div style={styles.container}>
            {props.data.map(recipe => (         //map
                <RecipesListItem                //wywołanie komponentu z pojedyńczym ListItem 
                key={recipe.key}
                data={recipe}                   //przekazanie danych tylko jednego przepisu
                route={props.route}
                changeRoute={props.changeRoute}     //routy od UserRecipes do RecipesListItem
                />
              ))}
        </div>
    )
}

export default RecipesList