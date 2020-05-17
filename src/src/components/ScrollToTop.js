import React from 'react'

import {useScrollTrigger, Zoom, Fab} from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

const styles = {
    div: {position: 'fixed', bottom: 20, right:20 }
}

//Funkcja przewijania do góry:
const onClick = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'  //płynne przewijanie do góry
    })
}

const ScrollToTop = props => {

    //wyzwala przycisk
    const trigger = useScrollTrigger({  
        disableHysteresis: true,
        threshold: 70,                 //O ile trzeba przewinać str, by wyświetlił się ScrollToTop
      });

    return(
 <Zoom in={trigger}>
    <div style={styles.div} onClick={onClick}>   
        <Fab color='primary' size="large">
        <KeyboardArrowUpIcon/>
        </Fab>
    </div>
 </Zoom>
    )
}

export default ScrollToTop