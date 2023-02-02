import * as React from 'react';
import { Button, TextField, FormControl, InputLabel, OutlinedInput, FormControlLabel, Checkbox, InputAdornment, IconButton, Box, Stack, Typography } from '@mui/material'
import AuthContext from '../context/AuthContext';
import { useContext, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { fetchUtil } from './../util/Fetch';
import { Url } from './../util/Ruta';
import LinearProgress from '@mui/material/LinearProgress';
import ClienteContext from '../context/ClienteContext';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
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
    }
}))
export default function Login() {
    const { auth, handleAuth } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    const [usuario, setUsuario] = useState(localStorage.getItem('recuerdaInnovasoft') || '')
    const [contraseña, setContraseña] = useState('')
    const [recuerda, setRecuerda] = useState(false)
    const navigate = useNavigate()
    const { cliente,handleCliente} = useContext(ClienteContext)
    let api = fetchUtil();
    const [typeAlert, setTypeAlert] = useState('')
    const [messageAlert, setMessageAlert] = useState('')
    const [loading, setLoading] = useState(false)
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
    React.useEffect(()=>{
        handleCliente(null)
    },[])
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const classes = useStyles()

    const handleSubmit = () => {

        if (recuerda) {
            localStorage.setItem('recuerdaInnovasoft', usuario)
        }
        if (!usuario.trim() || !contraseña.trim()) {
            setOpen(true)
            setTypeAlert('error')
            setMessageAlert('Los campos son obligatorios')
        } else {
            let objectPost = {
                username: usuario,
                password: contraseña
            }
            setLoading(true)
            api.post(Url('api/Authenticate/login'), { body: objectPost, headers: { "Content-Type": "application/json; charset=utf-8" } })
                .then(res => {
                    if (res.token) {
                        setTypeAlert('success')
                        setMessageAlert('Acceso correcto, bienvenido ')
                        setLoading(false)
                        handleClick()
                        handleAuth(res)
                        setTimeout(() => { navigate('/home') }, 1300)
                    } else {
                        setTypeAlert('error')
                        setMessageAlert('Credenciales invalidas, por favor intente nuevamente')
                        setLoading(false)
                        handleClick()
                    }
                })


        }

    }
    return (
        <>
            {loading? <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>:''}
            <Box className={classes.containInputs} align='center' sx={{ m: 1, width: '100%', height: 'calc( 100vh - 200px);' }}>
                <Box align='center' sx={{ m: 1, width: '30ch' }}  >
                    <Typography sx={{ m: 4 }} color='primary' align='center' variant='h5'>
                        Iniciar Sesión
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
                        <TextField required id="outlined-basic" label="Usuario" variant="outlined" value={usuario} onChange={(e) => { setUsuario(e.target.value) }} />
                        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                            <InputLabel required htmlFor="outlined-adornment-password"  >Contraseña</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                required
                                value={contraseña} onChange={(e) => { setContraseña(e.target.value) }}
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
                        </FormControl>
                    </Stack>
                    <FormControlLabel sx={{ width: '100%' }} checked={recuerda} onChange={(e) => setRecuerda(e.target.checked)} control={<Checkbox />} label="Recuerdame" />
                    <Button onClick={() => handleSubmit()} className={classes.buttonMargin} variant="contained" sx={{ m: 1, width: '100%' }} ><Typography sx={{ m: 1, width: '100%' }} variant='body1'>INICIAR SESIÓN</Typography></Button>
                    <Typography color='primary' variant='body1'>¿No tiene una cuenta?</Typography>
                    <Button onClick={() => navigate('/registro')} > <Typography color='primary' variant='body2'>Registrese</Typography></Button>
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