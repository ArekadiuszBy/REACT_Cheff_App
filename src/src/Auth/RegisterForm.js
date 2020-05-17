import React from 'react'
import { Paper, Typography, TextField, Button } from '@material-ui/core'

const styles = {    //flex, wycentrowany zawsze, vh i vw to %
    container:{ display: 'flex', justifyContent: 'center', alignItems:'center', height:'100vh', width:'100vw', position: 'absolute', top:0, left: 0 },
    paper: {maxWidth: 320, padding: 20 },
    //textwrap, by na telefonie wyświetlał się przycisk jeden pod drugim
    buttonDiv: { display: 'flex', justifyContent:'space-around', marginTop: 16, flexWrap:'wrap' },
}
    //input mail
const RegisterForm = props =>{
    const [email, setEmail] = React.useState('')
    const [emailError, setEmailError] = React.useState(false)
    const emailValidate = value => {
        //email regex, jak znajdzie coś w tablicy to zwraca true
        const isError = !value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        setEmailError(isError)
        return isError
    }
    //walidacja password
    const [pwd, setPwd] = React.useState('')
    const [pwdError, setPwdError] = React.useState(false)
    const pwdValidate = value => {
        const isError = (value.length <8)
        setPwdError(isError)
        return isError
    }
    //kolejna walidacja, tym razem na drugie pole hasła
    const [pwd2, setPwd2] = React.useState('')
    const [pwd2Error, setPwd2Error] = React.useState(false)
    const pwd2Validate = (value) => {
        const isError = (pwd !== value)
        setPwd2Error(isError)
        return isError
    }

    const onSubmit = () => {
        const isEmailError = emailValidate(email)
        const isPwdError = pwdValidate(pwd)
        const isPwd2Error = pwd2Validate(pwd2)
        if (!isEmailError && !isPwdError && !isPwd2Error){
            props._register(email, pwd)
        }
    }
    
    //na enter wykonuje funkcje te wyżej
    const submitOnEnter = evt => {
        if (evt.key === 'Enter')
            onSubmit()
    }

    return (
        <div style={styles.container}>
            <Paper style={styles.paper}>
                <Typography
                align='center'
                variant='h4'
                color='secondary'
                >
                    Zarejestruj się
                </Typography>
                <TextField
                value = {email}
                onKeyPress={submitOnEnter}
                onChange={evt => {
                    setEmail(evt.target.value)
                    if (emailError){
                        emailValidate(evt.target.value)
                    } 
                }}
                margin='normal'
                label='email'
                variant='outlined'
                onBlur={() => emailValidate(email)}
                fullWidth
                error={emailError}
                helperText={emailError ? 'Podaj prawidłowy email!' : null}
                />
            <TextField      //do pierwszego hasła
                value={pwd}
                onKeyPress={submitOnEnter}
                onChange={evt => {
                    setPwd(evt.target.value)
                    if(pwdError){  //waliduje zarówno jak wpiszemy do pwd2, a potem do pwd
                        pwdValidate(evt.target.value)
                        if(pwd2Error){
                            pwdValidate(evt.target.value !== pwd2)
                    }
                }
            }} 
                fullWidth
                margin='normal'
                label='hasło'
                variant='outlined'
                type='password'
                error={pwdError}
                onBlur={() => {
                    pwdValidate(pwd)
                    if (pwd2Error) {
                        pwd2Validate(pwd2)
                    }
                }
            }
        /> 
            <TextField          //do drugiego hasła
                value={pwd2}
                onKeyPress={submitOnEnter}
                onChange={evt => {
                    setPwd2(evt.target.value)
                    if(pwd2Error){
                        pwd2Validate(evt.target.value)
                     }
               }} 
                fullWidth
                margin='normal'
                label='powtórz hasło'
                variant='outlined'
                type='password'
                error={pwd2Error}
                helperText={pwd2Error ? 'Hasła muszą być takie same!' : null}
                onBlur={() => pwd2Validate(pwd2) }
                />

                <div style={styles.buttonDiv}>
                    <Button
                    style={styles.button}
                    color='primary'
                    variant='contained'
                    onClick={onSubmit}
                    margin='normal'
                    >
                        Zarejestruj
                    </Button>
                    <Button
                        style={styles.button}
                        color='secondary'
                        variant='contained'
                        onClick={props.toggleForm}
                    >
                         Powrót
                    </Button>
                </div>
            </Paper>
        </div>
    )
}


export default RegisterForm