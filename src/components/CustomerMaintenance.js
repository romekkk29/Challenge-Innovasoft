import AuthContext from '../context/AuthContext';
import ClienteContext from '../context/ClienteContext';
import { useContext, useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, TextareaAutosize, Snackbar, Alert } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { fetchUtil } from './../util/Fetch';
import { makeStyles } from '@mui/styles';
import { Url } from './../util/Ruta';
import Swal from 'sweetalert2'
import LinearProgress from '@mui/material/LinearProgress';
import { flexbox } from '@mui/system';
import { FolderZip } from '@mui/icons-material';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';
import * as React from 'react';

const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const StyledButton = styled('button')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    min-height: calc(1.5em + 22px);
    min-width: 320px;
    padding: 12px;
    border-radius: 12px;
    text-align: left;
    line-height: 1.5;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }
  
    &.${selectUnstyledClasses.focusVisible} {
      border-color: ${blue[400]};
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    &.${selectUnstyledClasses.expanded} {
      &::after {
        content: '▴';
      }
    }
  
    &::after {
      content: '▾';
      float: right;
    }
    `,
);

const StyledListbox = styled('ul')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 320px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
    `,
);

const StyledOption = styled(OptionUnstyled)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &.${optionUnstyledClasses.selected} {
      background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }
  
    &.${optionUnstyledClasses.highlighted} {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
  
    &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
      background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }
  
    &.${optionUnstyledClasses.disabled} {
      color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
  
    &:hover:not(.${optionUnstyledClasses.disabled}) {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
    `,
);

const StyledPopper = styled(PopperUnstyled)`
    z-index: 1;
  `;

const Label = styled('label')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.85rem;
    display: block;
    margin-bottom: 4px;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? grey[400] : grey[700]};
    `,
);
const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
    const slots = {
        root: StyledButton,
        listbox: StyledListbox,
        popper: StyledPopper,
        ...props.slots,
    };

    return <SelectUnstyled {...props} ref={ref} slots={slots} />;
});
const useStyles = makeStyles(theme => ({
    containerNav: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0px',
        marginBottom: '30px'
    },
    margin: {
        margin: '0px',
        padding: '20px'
    },
    marginLeft: {
        marginLeft: '18px !important',

    },
    icon: {
        color: '#606060 !important',
        cursor: 'pointer'
    },
    containerForm: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        '@media all and (max-width:600px)': {
            flexDirection: 'column !important'
        }
        
    },
    containerForms: {

        gap: '10px'


    },
    containerFields: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        '@media all and (max-width:600px)': {
            flexDirection: 'column !important'
        }
    },
    button2: {
        marginTop: '40px !important',
        marginLeft: '40px !important'
    }


}))
export default function CustomerMaintenance() {
    const { auth } = useContext(AuthContext)
    const { cliente,handleCliente} = useContext(ClienteContext)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const classes = useStyles()
    const [typeAlert, setTypeAlert] = useState('')
    const [messageAlert, setMessageAlert] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [direccion, setDireccion] = useState('')
    const [interes,setInteres]=useState([])
    const [interesValor,setInteresValor]=useState(interes[0])
    const [nacimiento,setNacimiento]=useState('2017-05-24')
    const [afiliacion,setAfiliacion]=useState('2017-05-24')
    const [sexo,setSexo]=useState('10')
    const [reseñaPersonal, setReseñaPersonal] = useState('')
    const [indentificacion, setIdentificacion] = useState('')
    const [celular, setCelular] = useState('')
    const [otroTelefono, setOtroTelefono] = useState('')
    const [open, setOpen] = React.useState(false);
    let api = fetchUtil();
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    useEffect(()=>{
        setLoading(true)
        if (!auth){

        }else{
            api.get(Url('api/Intereses/Listado'), {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + auth.token,
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br"
                }
            }).then(res => {
                if (res) {
                    if (res.length) {
                        setLoading(false)
                        setInteres(res)
                    } else {
                        setLoading(false)
    
                    }
                }else{setLoading(false)}
            })
        }
       
    },[])
    useEffect(()=>{
        if (auth&&cliente){
            
            setNombre(cliente.nombre)
            setApellidos(cliente.apellidos)
            setIdentificacion(cliente.identificacion)
            setCelular(cliente.telefonoCelular)
            setOtroTelefono(cliente.otroTelefono)
            setDireccion(cliente.direccion)
            setNacimiento(cliente.fNacimiento.substring(0,10))
            setAfiliacion(cliente.fAfiliacion.substring(0,10))
            setSexo(cliente.sexo==='F'?'10':'20')
            setReseñaPersonal(cliente.resenaPersonal)
            let este=interes.filter(elemento=>elemento.id===cliente.interesesId)[0]
            setInteresValor(este)
        }
    },[])
    if (!auth) {
        return <Navigate to='/login'></Navigate>
    }
    const crearClient=()=>{
        if(nombre&&apellidos&&indentificacion&&celular&&otroTelefono&&direccion&&interesValor){
            if(cliente){
                setLoading(true)
                let objectPost={
                    id:cliente.id,
                    nombre:nombre,
                    apellidos: apellidos,
                    identificacion:indentificacion,
                    celular: celular,
                    otroTelefono: otroTelefono,
                    direccion: direccion,
                    fNacimiento: new Date(nacimiento),
                    fAfiliacion: new Date(afiliacion),
                    sexo: sexo==='10'?'F':'M',
                    resennaPersonal: reseñaPersonal?reseñaPersonal:'',
                    imagen:'',
                    interesFK: interesValor.id,
                    usuarioId: auth.userid
                }
                api.post(Url('api/Cliente/Actualizar'), { body: objectPost,  headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + auth.token,
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br"
                } })
                .then(res => {
                    
                    
                        setTypeAlert('success')
                        setMessageAlert('Se actualizo exitosamente')
                        setLoading(false)
                        handleClick()
                        setTimeout(()=>{navigate('/consulta')},1300)
                    
                })
        
            }else{
                setLoading(true)
                let objectPost={
                    nombre:nombre,
                    apellidos: apellidos,
                    identificacion:indentificacion,
                    celular: celular,
                    otroTelefono: otroTelefono,
                    direccion: direccion,
                    fNacimiento: new Date(nacimiento),
                    fAfiliacion: new Date(afiliacion),
                    sexo: sexo==='10'?'F':'M',
                    resennaPersonal: reseñaPersonal?reseñaPersonal:'',
                    imagen:'',
                    interesFK: interesValor.id,
                    usuarioId: auth.userid
                }
                api.post(Url('api/Cliente/Crear'), { body: objectPost,  headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + auth.token,
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br"
                } })
                .then(res => {
                    
                    
                        setTypeAlert('success')
                        setMessageAlert('Se registro exitosamente')
                        setLoading(false)
                        handleClick()
                        setTimeout(()=>{navigate('/consulta')},1300)
                    
                })
        
            }
            
        }else{
            setTypeAlert('error')
            setMessageAlert('Complete los campos obligatorios')
            setLoading(false)
            handleClick()
        }
        }
    

    
    return (
        <>
            {loading ? <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box> : ''}
            <Box className={classes.containerNav}>
                <Typography className={classes.margin} variant='h3' color='primary' element='div'>Mantenimiento de clientes</Typography >
                <Box className={classes.margin}>
                    
                    <Button className={classes.marginLeft} onClick={() => { navigate('/home') }} variant="outlined" startIcon={<ArrowBackIcon />}>
                        Home
                    </Button>
                </Box>
            </Box>
            <Box className={classes.containerForm}>
                <Box className={classes.containerForms}>
                    <Box className={classes.containerFields}>
                        <TextField required id="outlined-basic" label="Nombre" variant="outlined" value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                        <TextField required id="outlined-basic" label="Apellidos" variant="outlined" value={apellidos} onChange={(e) => { setApellidos(e.target.value) }} />
                        <TextField required id="outlined-basic" label="Identificacion" variant="outlined" value={indentificacion} onChange={(e) => { setIdentificacion(e.target.value) }} />
                    </Box>
                    <Box className={classes.containerFields}>
                        <TextField required id="outlined-basic" label="Celular" variant="outlined" value={celular} onChange={(e) => { setCelular(e.target.value) }} />
                        <TextField required id="outlined-basic" label="Otro Telefono" variant="outlined" value={otroTelefono} onChange={(e) => { setOtroTelefono(e.target.value) }} />
                        <TextField required id="outlined-basic" label="direccion" variant="outlined" value={direccion} onChange={(e) => { setDireccion(e.target.value) }} />
                    </Box>
                    <TextareaAutosize placeholder="Reseña personal"
                        style={{ width: 400, height: 40, padding: 10, borderRadius: 5 }} value={reseñaPersonal} onChange={(e) => { setReseñaPersonal(e.target.value) }} />

                </Box>
                <Box className={classes.containerForms}>
                    <Box className={classes.containerFields}>
                        <form className={classes.container} noValidate>
                            <TextField
                                id="date"
                                label="Afiliacion*"
                                type="date"
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                value={nacimiento}
                                onChange={(e)=>setNacimiento(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form>
                        <form className={classes.container} noValidate>
                            <TextField
                                id="date"
                                label="Nacimiento*"
                                type="date"
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                value={afiliacion}
                                onChange={(e)=>setAfiliacion(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form>
                    </Box>

                    <Box className={classes.containerFields}>
                        <Box sx={{ mb: 2 }}>
                            <Label htmlFor="unnamed-select">Interes*</Label>
                            <CustomSelect id="unnamed-select" 
                            value={interesValor}
                            onChange={(e, newValue) => setInteresValor(newValue)}>
                                {interes.map(element=><StyledOption key={element.id} value={element}>{element.descripcion}</StyledOption>)}
                            </CustomSelect>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Label htmlFor="unnamed-select">Sexo*</Label>
                            <CustomSelect value={sexo} onChange={(e, newValue) => setSexo(newValue)} defaultValue={'10'} id="unnamed-select">
                                <StyledOption value={'10'}>M</StyledOption>
                                <StyledOption value={'20'}>F</StyledOption>

                            </CustomSelect>
                        </Box>
                    </Box>
                </Box>

            </Box>
            <Button onClick={()=>crearClient()} className={classes.button2} variant="contained"> Guardar cambios </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={typeAlert} sx={{ width: '100%' }}>
                    {messageAlert}
                </Alert>
            </Snackbar>
        </>
    );

}