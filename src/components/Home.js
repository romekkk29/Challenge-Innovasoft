import AuthContext from '../context/AuthContext';
import ClienteContext from '../context/ClienteContext';
import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Typography,Box} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    container:{
        width:'100%',
        height:'calc(100vh - 200px)',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'

    }
}))
export default function Home() {
    const { auth } = useContext(AuthContext)
    const { cliente, handleCliente } = useContext(ClienteContext)
    const classes = useStyles()
    useEffect(()=>{
         handleCliente(null)
    },[])
    if (!auth) {
        return <Navigate to='/login'></Navigate>
    }


    return (
        <>      
            <Box className={classes.container}>
                     <Typography variant='h2' align='center'>Bienvenido</Typography>
            </Box>
        </>
    );

}