import AuthContext from '../context/AuthContext';
import ClienteContext from '../context/ClienteContext';
import { useContext, useEffect, useState } from 'react';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { fetchUtil } from './../util/Fetch';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { Url } from './../util/Ruta';
import Swal from 'sweetalert2'
import LinearProgress from '@mui/material/LinearProgress';
const useStyles = makeStyles(theme => ({
    containerNav: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0px'
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
    }

}))
export default function CustomerConsult() {
    const { auth } = useContext(AuthContext)
    const { cliente, handleCliente } = useContext(ClienteContext)
    const navigate = useNavigate()
    const [typeAlert, setTypeAlert] = useState('')
    const [messageAlert, setMessageAlert] = useState('')
    let api = fetchUtil();
    const [loading, setLoading] = useState()
    const [data, setData] = useState(
        [
        ]
    )
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
    const classes = useStyles()
    useEffect(() => {
        if (!auth){

        }else{
            setLoading(true)
            handleCliente(null)
            api.post(Url('api/Cliente/Listado'), {
                body: {
                    usuarioId: auth.userid, identificacion: "",
                    nombre: ""
                },
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
                        setData(res)
                    } else {
                        setLoading(false)
    
                    }
                }
            })
        }
       

    }, [])
    if (!auth) {
        return <Navigate to='/login'></Navigate>
    }
    const recarga = () => {
        setLoading(true)
        api.post(Url('api/Cliente/Listado'), {
            body: { usuarioId: auth.userid },
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
                    setData(res)
                } else {
                    setLoading(false)

                }
            }
        })
    }
    const eliminar = (id) => {
        Swal.fire({
            title: '¿Desear eliminar al cliente?',
            showDenyButton: true,
            confirmButtonText: 'SI',
            denyButtonText: `NO`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setLoading(true)
                api.del(Url('api/Cliente/Eliminar/' + id.toString()), {
                    body: { usuarioId: auth.userid },
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + auth.token,
                        "Accept": "*/*",
                        "Accept-Encoding": "gzip, deflate, br"
                    }
                }).then(res => {
                    setTypeAlert('success')
                    setMessageAlert('Se elimino correctamente')
                    setLoading(false)
                    handleClick()
                    setData(data.filter(element=>element.id!==id))
                })
            } else if (result.isDenied) {

            }
        })


    }
    const editar = (id) => {
       
                setLoading(true)
                api.get(Url('api/Cliente/Obtener/' + id.toString()), {

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + auth.token,
                        "Accept": "*/*",
                        "Accept-Encoding": "gzip, deflate, br"
                    }
                }).then(res => {
                    console.log(res)
                    setLoading(false)
                    handleCliente(res)
                    navigate('/mantenimiento')
                })
            
        


    }
    const columns = [
        {
            name: 'Nombre',
            selector: 'nombre',
            sortable: true,

        },
        {
            name: 'Apellidos',
            selector: 'apellidos',
            sortable: true
        },
        {
            name: 'Identificacion',
            selector: 'identificacion',
            sortable: true,
        },
        {
            name: 'Editar',
            cell: row => <><EditIcon onClick={() => { editar(row.id) }} className={classes.icon} /></>,
            sortable: true,

        },
        {
            name: 'Eliminar',
            cell: row => <><DeleteIcon onClick={() => { eliminar(row.id) }} className={classes.icon} /></>,
            sortable: true,

        }
    ]
    const tableData = {
        columns,
        data,
        exportHeaders: true,
        fileName: 'clientes',
        filterPlaceholder: 'Buscar nombre o apellido.'

    };


    return (
        <>
            <Box>
                {loading ? <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box> : ''}
                <Box className={classes.containerNav}>
                    <Typography className={classes.margin} variant='h3' color='primary' element='div'>Lista de clientes</Typography >
                    <Box className={classes.margin}>
                        <Button onClick={() => { navigate('/mantenimiento') }} variant="outlined" startIcon={<AddCircleOutlineIcon />}>
                            Agregar
                        </Button>
                        <Button className={classes.marginLeft} onClick={() => { navigate('/home') }} variant="outlined" startIcon={<ArrowBackIcon />}>
                            Home
                        </Button>
                    </Box>
                </Box>
                <DataTableExtensions
                    {...tableData}

                >
                    <DataTable

                        pagination
                        paginationComponentOptions={{
                            rowsPerPageText: 'Filas por Página',
                            rangeSeparatorText: 'de',
                            selectAllRowsItem: true,
                            selectAllRowsItemText: 'Todos'
                        }}
                        noHeader
                        defaultSortField="id"
                        defaultSortAsc={false}
                        highlightOnHover

                    >

                    </DataTable>
                </DataTableExtensions>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={typeAlert} sx={{ width: '100%' }}>
                        {messageAlert}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );

}