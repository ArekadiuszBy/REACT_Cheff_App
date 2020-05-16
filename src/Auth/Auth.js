import React from 'react'
import { connect } from 'react-redux'
import {registerAsyncActionCreator} from '../state/auth'

import LogInForm from './LogInForm'
import RegisterForm from './RegisterForm'

const Auth = props =>{

    const [toggleForm, setToggleForm] = React.useState(true)

    return (
        props._isLogged ?
        props.children
        :
        toggleForm ?
        <LogInForm 
        toggleForm={() => setToggleForm(false)}
        />       
        :
        <RegisterForm
        toggleForm={() => setToggleForm(true)}
        _register={props._register}
        />
    )
}

const mapStateToProps = state => ({
    _isLogged: state.auth.isLogged
})

const mapDispatchToProps = dispatch => ({
    _register: (email, password) => dispatch(registerAsyncActionCreator(email, password))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth)