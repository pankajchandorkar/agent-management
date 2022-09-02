import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AlertDialog(props) {

    const { open, onClose, showTitle = false, alertMessage = "Alert", severity = "success" } = props;

    const handleClose = () => {
        onClose(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                {showTitle && <DialogTitle id="alert-dialog-title">

                </DialogTitle>}

                <DialogContent>
                    <Alert severity={severity}>{alertMessage}</Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialog;