import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Typography } from '@mui/material';
import './../css/error.css'

export default function Error() {

    return (
        <>
            <section className='pageError'>
                <div className='pageEror_ContainIcon'>
                    <ReportProblemIcon className='pageError_Icon' color='primary' />
                    <Typography variant='h1' color='primary' >
                        404
                    </Typography>
                </div>
                <Typography variant='h6' color='#606060' align='center'>
                    Oops... ¡Página no encontrada!
                </Typography>
            </section>
        </>
    );

}