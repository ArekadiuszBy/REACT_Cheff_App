import React from 'react'

import serce from '../img/serce.jpg'
import { Typography, Paper } from '@material-ui/core'

const styles = {    //flex, wycentrowany zawsze, vh i vw to %
    paper: {maxWidth: 320, padding: 20, color:'primary'}
}

const Dashboard = props => {
    return(
        <div>
            <Typography
                variant='h2'
                align='center'
                color='#4d0000'
            >
              Witaj na Cheff App!
              <br/>
              <br/>
            </Typography>
            <Paper align='center' marginLeft='50' fontSize='50' square='true' elevation = '24'>
            <br/><br/><br/><br/>
                Cheff App to najlepsza strona z waszymi przepisami,
                z których każdy może skorzystać.
                <br/>
                <br/>
                <br/>
                By dodać swój przepis kliknij w ikonę po lewej,
                a następnie kliknij "Dodaj przepis"
                <br/>
                <br/>
                By wyświetlić swoje przepisy kliknij w "Twoje przepisy"
                <br/>
                <br/>
                By wyświetlić wszystkie przepisy kliknij w "Przepisy"
               
                <br/><br/><br/><br/><br/><br/><br/>
                <Paper style={styles.paper}>
                    SMACZNEGO!
                </Paper>
                <br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/>
            </Paper>
        </div>
       
    )
}

export default Dashboard 