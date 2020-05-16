import React from 'react'
import {connect} from 'react-redux'
import {Snackbar, SnackbarContent} from '@material-ui/core'




const Snackbars = props => {
    return(
        <div>
            {props._bars.map((el, index) => (
            <Snackbar
            style = {{position:'fixed', bottom: (30 + 70*index) }}  //1. element (powiadomienie w ramce) będzie na wysokości 30, 
            //drugi na 100, trzeci na 170 itd
            key={el.key}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal:'left',
            }}
            open={true}
            >
                <SnackbarContent
                style={{backgroundColor: el.color}}
                message={el.text}/>
            </Snackbar>
            ))}
        </div>
    )
}

const mapStateToPros = state => ({
    _bars:state.snackbars.bars
})


export default connect(
    mapStateToPros,
)(Snackbars)