import React from 'react'
import { TextField, Fab, Paper, Typography, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'

const MAX_LENGTH = 30
const MIN_INGREDIENT_LENGTH = 3

const styles={
    container: {maxWidth:380},
    inputsDiv: {display:'flex', justifyContent: 'center'},
    input: {margin: '10px 20px 10px 0', maxWidth: 150},
    addButton: {marginTop: 18},
    paper: {maxWidth: 380, padding:10, marginTop:10, marginBottom:10},
    singleIngredient: {display: 'flex'},
    singleIngredientTypography: {flexGrow: 1},  //bu zawsze delete była po prawej stronie
    singleIngredientRemoveButton: {width:30, height: 30, alignSelf: 'center'}
}

const Ingredients = props => {
    const [ingredient, setIngredient] = React.useState('')
    const [ingredientError, setIngredientError] = React.useState(false)
    const ingredientValidate = value => {
        const validValue = value && value.replace(/\s{2,}/g, ' ')
        if (value !== validValue){
            setIngredient(validValue)
        }

        //kiedy ma być błąd
          const isError = !validValue || validValue.length < MIN_INGREDIENT_LENGTH
          setIngredientError(isError)
          return isError      //zwraca do tablicy
         }

          const setValidIngredient = string => {
        if(string.length < MAX_LENGTH){
            setIngredient(string)
        }
    }
    const focusTo = React.useRef(null)  //hook

    const [quantity, setQuantity] = React.useState('')
    const [quantityError, setQuantityError] = React.useState(false)
    const quantityValidate = value => {
        const validValue = value && value.replace(/\s{2,}/g, ' ')
        if (value !== validValue){
            setQuantity(validValue)
        }
        //kiedy ma być błąd
          const isError = !validValue
          setQuantityError(isError)
          return isError      //zwraca do tablicy
         }
          const setValidQuantity = string => {
        if(string.length < MAX_LENGTH){
            setQuantity(string)
        }
    }

    const inputs = [
        {
            label:'Składnik',
            value: ingredient,
            error: ingredientError,
            helperText: 'min. 3 znaki',
            onChange: setValidIngredient,
            validate: ingredientValidate,
            inputRef: focusTo
        },
        {
            label:'Ilość',
            value: quantity,
            error: quantityError,
            helperText: 'Podaj ilość',
            onChange: setValidQuantity,
            validate: quantityValidate
        },
    ]

    const onSubmit = () => {
        const isIngredientError = ingredientValidate(ingredient)
        const isQuantityError = quantityValidate(quantity)
        //jeśli nie będzie błędu
        if(!isIngredientError && !isQuantityError){
            props.setIngredients([
                ...props.ingredients, 
            {
                ingredient: ingredient.toLowerCase(),          //toLowerCase ułatwi wyszukiwanie po składnikach
                quantity
            }
        ])
        //po kliknięciu add usuwa poprzednie wartości z pól input
        setIngredient('')
        setQuantity('')
        focusTo.current.focus()   //po kliknięciu +/enter przenosi nas z Ilość do Składnik
        }
    }

    //submit przez enter, by nie trzeba było klikać +
    const submitOnEnter = evt => {
        if(evt.key === 'Enter') {
            onSubmit()
        }
    }

    //funkcja do usuwania składników z Paper
    const removeIngredient = index => {
        //zapisujemy tablice, usuwamy poprzez filter => przepuść wszystkie
        //elementy po za tym (if index taki sam to będzie false i filter nie przepuści)
        props.setIngredients(props.ingredients.filter((el, i) => index !==i))
    }

    return(
        <div style={styles.container}>
            <div style={styles.inputsDiv}>
            {inputs.map(input =>
            <TextField
                  key={input.label}  //Jak robimy mape musi być KEY
                  style={styles.input}
                  variant='outlined'
                  fullWidth
                  label={input.label}
                  value={input.value}
                  error={input.error}
                  helperText={input.error && input.helperText}
                  onChange={evt => 
                    {
                    input.onChange(evt.target.value)
                        if(input.error) {
                            input.validate(evt.target.value)
                        }
                    }} 
                  onKeyPress={submitOnEnter}
                  inputRef={input.inputRef}
                />
            )}  
                <Fab            //okrągły przycisk
                style={styles.addButton}
                size='small'    
                color='primary'
                onClick={onSubmit}
                > 
                    <AddIcon />         
                </Fab>         
           </div>
           {    //By lista zapisanych składników wyświetlała się dopiero
                //po zapisaniu jakiegoś składnika
               props.ingredients.length >0 &&
           <Paper //coś jak div, lepszy do wyświetlania listy (składników już wczytanych)
           style={styles.paper} >
                    <Typography
                    align='center'
                   >
                        Składniki:
                    </Typography>
                    
                    {props.ingredients.map((ingredient, index) => ( //By wyświetlały się składniki w Paper
                        <div //style, by przycisk delete był w jednej linii wraz z ingredient 
                        style={styles.singleIngredient}
                        key={ingredient.ingredient+ingredient.quantity+index} //Ten klucz musi być unikatowy
                        >
                            <Typography //wyliczanie dodanych składników
                            style={styles.singleIngredientTypography}
                            > 
                                {index+1}. {ingredient.ingredient} - {ingredient.quantity} 
                            </Typography>
                            <IconButton
                            style={styles.singleIngredientRemoveButton}
                            size='small'
                            onClick={() => removeIngredient(index)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    ))}
           </Paper>
            }
        </div>
    )
}

export default Ingredients