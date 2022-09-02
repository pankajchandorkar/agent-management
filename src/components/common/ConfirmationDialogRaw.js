import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import "../../style/common/confirm-dialog.scss";
import { Box } from '@mui/system';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ConfirmationDialogRaw(props) {
  const { onClose, open, cancelRequired = true, dialogConfirmationTitle = 'Confirmation', dialogConfirmationMessage = 'Are Your Sure ?', showTitle = true, ...other } = props;

  const handleCancel = () => {
    onClose(false);
  };

  const handleOk = () => {
    onClose(true);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '25%', maxHeight: 435,borderRadius:'10px' } }}
      maxWidth="xs"
      TransitionComponent={Transition}
      open={open}
      {...other}
    >
      {showTitle && <DialogTitle>{dialogConfirmationTitle}</DialogTitle>}

      <DialogContent dividers>
        {dialogConfirmationMessage}
      </DialogContent>
      <DialogActions>
        {cancelRequired && <div className="dialog-cancel"><Button autoFocus onClick={handleCancel}>Cancel</Button></div>}
        {cancelRequired && <div className="vline"></div>}
        <div className="dialog-confirm"><Button onClick={handleOk}>Confirm</Button></div>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ConfirmationDialogRaw;