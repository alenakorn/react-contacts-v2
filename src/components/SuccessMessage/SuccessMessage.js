import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomizedSnackbars = (props) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            marginTop: theme.spacing(8),
        },
    }));

    const classes = useStyles();

    return (
        <Snackbar
            className={classes.root}
            autoHideDuration={4000}
            open={props.alertOpen}
            onClose={props.handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}

        >
            <Alert onClose={props.handleClose} severity="success">
                This is a success message!
            </Alert>
        </Snackbar>
    );
}

export default CustomizedSnackbars
