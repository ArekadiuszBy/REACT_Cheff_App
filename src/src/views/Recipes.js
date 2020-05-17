import React from 'react'

import { connect } from 'react-redux'
import { getRecipesAsyncActionCreator } from '../state/recipes'
import { Typography } from '@material-ui/core'
import RecipesList from '../components/RecipesList/RecipesList'
import SingleRecipe from './SingleRecipe'


const styles={
    refresh: {cursor: 'pointer', color:'blue'}      //zmiana wyglądu kursora i koloru
}

class UserRecipes extends React.Component{
    state= {

    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        this.props._getData()
    }

    render(){
        if (this.props._isError){   //obsługa błędu
            return(
                <div>
                    <Typography
                    variant='h4'
                    align='center'
                    color='error'
                    >
                        Nie udało się pobrać przepisów
                    </Typography>
                    <Typography
                    style={styles.refresh}
                    variant='h4'
                    align='center'
                    onClick={this.getData}>
                        Odśwież
                    </Typography>
                </div>
            )
        }        

        if(this.props.match.params.id){        //sprawdzenie czy istnieje parametr (XXX - http://localhost:3000/your-recipes/XXX)
                //^jeśli tak, to zwraca element od find() di zmiennej recipe
            const recipe = this.props._recipes.find(el => el.key === this.props.match.params.id)          
            return <SingleRecipe
                data={recipe}
                param={this.props.match.params.id} //przekazywanie id do SingleRecipe
                back={() => this.props.history.push('/your-recipes')}    //powrót po błędzie (nie znaleziono) do przepisów
            />
        }

        return (
            <div    >
                <RecipesList                //wywołanie listy z przepisami
                data={this.props._recipes}  //przekazanie props'a z tablicą wszystkich przepisów
                route='/your-recipes'
                changeRoute={this.props.history.push}   //routy do RecipesList
                
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    _isError: state.recipes.isError,
    _recipes: state.recipes.recipes
})

const mapDispatchToProps = dispatch => ({
    _getData: () => dispatch(getRecipesAsyncActionCreator())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserRecipes)