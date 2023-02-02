import { Button, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Box, Stack, Typography } from '@mui/material'
import AuthContext from '../context/AuthContext';
import { useContext, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import FormHelperText from '@mui/material/FormHelperText';
import { fetchUtil } from './../util/Fetch';
import { Url } from './../util/Ruta';
import axios from 'axios'
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';

const useStyles = makeStyles(theme => ({
    containInputs: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0px !important',
    },
    buttonMargin: {
        margin: '0px !important',
        marginTop: '15px !important',
        marginBottom: '10px !important',
    },
    colorError: {
        color: '#d32f2f !important'
    }
}))
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SingUp() {
    const { auth, handleAuth } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    let api = fetchUtil();
    const [typeAlert, setTypeAlert] = useState('')
    const [messageAlert, setMessageAlert] = useState('')
    const [loading, setLoading] = useState(false)
    const [usuario, setUsuario] = useState({
        text: '',
        error: false,
        errorText: ''
    })
    const [email, setEmail] = useState({
        text: '',
        error: false,
        errorText: ''
    })
    const [contraseña, setContraseña] = useState({
        text: '',
        error: false,
        errorText: ''
    })
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const navigate = useNavigate()
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const classes = useStyles()
    const handleSubmit = () => {
        let regretsEmail = /^([a-zA-Z0-9_\-\.]+)@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/g;
        let regexp_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{9,20}/;
        let pasaUsuario = false
        let pasaEmail = false
        let pasaContra = false
        if (!usuario.text.trim()) {
            setUsuario(prev => ({ ...prev, error: true, errorText: 'El campo es obligatorio' }))
            pasaUsuario = false
        } else {
            setUsuario(prev => ({ ...prev, error: false, errorText: '' }))
            pasaUsuario = true
        }
        if (!email.text.trim()) {
            setEmail(prev => ({ ...prev, error: true, errorText: 'El campo es obligatorio' }))
            pasaEmail = false
        } else if (!regretsEmail.test(email.text)) {
            setEmail(prev => ({ ...prev, error: true, errorText: 'Ingrese un correo válido' }))
            pasaEmail = false
        } else {
            setEmail(prev => ({ ...prev, error: false, errorText: '' }))
            pasaEmail = true
        }
        if (!contraseña.text.trim()) {
            setContraseña(prev => ({ ...prev, error: true, errorText: 'El campo es obligatorio' }))
            pasaContra = false
        } else if (!regexp_password.test(contraseña.text)) {
            setContraseña(prev => ({ ...prev, error: true, errorText: 'La contraseña debe ser mayor a 8 caracteres, debe poseer números, al menos una mayúscula y una minúscula' }))
            pasaContra = false
        } else {
            setContraseña(prev => ({ ...prev, error: false, errorText: '' }))
            pasaContra = true
        }
        if (pasaUsuario && pasaEmail && pasaContra) {
            let objectPost = {
                username: usuario.text,
                email: email.text,
                password: contraseña.text
            }
            setLoading(true)
            api.post(Url('api/Authenticate/register'), { body: objectPost, headers: { "Content-Type": "application/json; charset=utf-8" } })
                .then(res => {
                    console.log(res)
                    if (res.status !== 'Error') {
                        setTypeAlert('success')
                        setMessageAlert(res.message + ', para iniciar sesión continue al LOGIN')
                        setLoading(false)
                        handleClick()

                    }else{
                        setTypeAlert('error')
                        setMessageAlert(res.message)
                        setLoading(false)
                        handleClick()
                    }
                })


        }

    }
    return (
        <>
            {loading ? <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box> : ''}
            <Box className={classes.containInputs} align='center' sx={{ m: 1, width: '100%', height: 'calc( 100vh - 200px);' }}>
                <Box align='center' sx={{ m: 1, width: '30ch' }}  >
                    <Typography sx={{ m: 4 }} color='primary' align='center' variant='h5'>
                        Registro
                    </Typography>
                    <Stack
                        component="form"
                        sx={{
                            width: '30ch',
                        }}
                        spacing={2}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField error={usuario.error} helperText={usuario.errorText} required id="outlined-basic" label="Usuario" variant="outlined" value={usuario.text} onChange={(e) => setUsuario(prev => ({ ...prev, text: e.target.value }))} />
                        <TextField error={email.error} helperText={email.errorText} required id="outlined-basic" label="Correo" variant="outlined" value={email.text} onChange={(e) => setEmail(prev => ({ ...prev, text: e.target.value }))} />
                        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                            <InputLabel error={contraseña.error} helperText={contraseña.errorText} required htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                required
                                error={contraseña.error}
                                helperText={contraseña.errorText}
                                value={contraseña.text} onChange={(e) => setContraseña(prev => ({ ...prev, text: e.target.value }))}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Contraseña"
                            />
                            <FormHelperText className={classes.colorError} id="component-error-text">{contraseña.error ? contraseña.errorText : ''}</FormHelperText>
                        </FormControl>
                    </Stack>
                    <Button onClick={() => handleSubmit()} className={classes.buttonMargin} variant="contained" sx={{ m: 1, width: '100%' }} ><Typography sx={{ m: 1, width: '100%' }} variant='body1'>REGISTRARME</Typography></Button>
                    <Typography color='primary' variant='body1'>¿Tienes una cuenta?</Typography>
                    <Button onClick={() => navigate('/login')} > <Typography color='primary' variant='body2'>Logeate</Typography></Button>
                </Box>
            </Box>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={typeAlert} sx={{ width: '100%' }}>
                    {messageAlert}
                </Alert>
            </Snackbar>
        </>
    );

}