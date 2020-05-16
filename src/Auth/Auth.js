import React from 'react'
import { connect } from 'react-redux'
import LogInForm from './LoginForm'

const Auth = props =>{
    return (
        props._isLogged ?
        props.children
        :
        <LogInForm />
    )
}

const mapStateToProps = state => ({
    _isLogged: state.auth.isLogged
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth)