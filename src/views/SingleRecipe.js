//plik do przepisów z route (po kliknięciu miniaturki z "Przepisy")
import React from 'react'
import { Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import DotIcon from '@material-ui/icons/Brightness1'

import imgPlaceHolder from '../img/img-placeholder.jpg'

const styles={
    backToRecipes: {cursor:'pointer', textDecoration:'underline', fontWeight:'bold'}
}

const SingleRecipe = props => {

    if(!props.data){     //if undefined
        return (
            <div>
                <Typography
                variant='h4'
                color='secondary'
                align='center'
                >
                    Nie znaleziono przepisu o identyfikatorze: 
                    <br/>
                    {props.param}
                </Typography>
                <Typography
                style={styles.backToRecipes}
                variant='h4'
                color='primary'
                align='center'
                onClick={props.back}        //funkcja w UserRecipes
                >   
                <br/><br/><br/>
                    Wróć do przepisów
                </Typography>
            </div>
        )
    }

    return(
        <Paper                                  //taka jakby kartka
        style={{padding: 20, maxWidth:600, margin: '20px auto' }}   //wyśrodkowane za pomocą marginesu
        >
            <div
            style={{display: 'flex', flexWrap:'wrap-reverse', alignItems:'flex-end'}}       //wrap reverse, by przy zmniejszaniu strony zdjęcie przeskoczyło do góry
            >
                <div
                style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow:1, margin: '20px 20px 0 20px' }}
                >
                    <Typography     //do nazwy przepisu
                        style={{maxWidth:264, wordBreak: 'break-word'}}     //gdy ktos wpisze za długą nazwę -> słowo zostanie załamane
                        variant='h5'
                        align='center'
                        color='secondary'
                        gutterBottom        //margines dolny
                    >
                        <b>{props.data.name.toUpperCase()}</b>
                    </Typography>
                    <Typography
                        style={{fontSize: 12 }}
                        align='center'
                        color='secondary'
                        gutterBottom
                        paragraph
                    >
                            Czas przygotowywania: {props.data.time}min
                    </Typography>
                    <Typography
                        style={{marginTop: 5}}
                        align='center'
                        color='secondary'
                        gutterBottom
                    >
                            <b>Składniki:</b>
                    </Typography>
                    <List
                        style={{marginTop: -5}}
                    >
                        {props.data.ingredients.map((el, index) => (
                            <ListItem
                                style={{paddingTop:0, paddingBottom:0 }}      //usunięcie paddingów, by składniki były blisko jeden pod drugim
                                key={el.ingredient+el.quantity + index}     //Tworzenie unikatowego klucza
                            >   
                            <ListItemIcon
                                style={{marginRight: -40}}
                            >
                                <DotIcon style={{width:7}} />
                            </ListItemIcon>
                            <ListItemText
                                style={{marginTop:0, marginBottom:0}}   
                                primary={el.ingredient + ' - '+ el.quantity}
                                primaryTypographyProps={{style: {fontSize: 14}}}
                            />
                            </ListItem>
                        ))}
                    </List>
                </div>
                <div            //div na obrazek
                    style={{width:264, maxHeight:264, position: 'relative', margin: '0 auto'}}
                >
                    <img        //wys. ta sama co wyżej, 100% coś nie gra, podczas ładowania dajemy schabowego
                    style={{width: '100%', maxHeight: 264, backgroundImage: 'url(' + imgPlaceHolder + ')', backgroundSize: 'cover', backgroundPosition: 'center' }}
                    src={props.data.photo}
                    alt={props.data.name}
                    //w razie niepowodzenia ściągnięcia obrazka dodajemy schabowego
                    onError={evt => evt.target.src = imgPlaceHolder}
                    />
                </div>
            </div>

            <div        //div do opisu
                style={{width: '100%', marginTop: 25}}
            >
                <Typography
                    variant='h5'
                    align='center'
                    color='secondary'
                    gutterBottom            
                >
                    Sposób przygotowywania:
                </Typography>
                <Typography
                     //W bazie każdy krok opisu przepisu jest: "1. Mleko ugotować.\n2. Wypić"
                     //i gdy jest \n to przenosi dalszą część do nast. linijki
                    style={{wordBreak:'break-word', whiteSpace:'pre-line', marginTop:20 }}     
                    align='center'
                    
                >
                    {props.data.description}
                </Typography>
            </div>
        </Paper>
        
    )
}

export default SingleRecipe