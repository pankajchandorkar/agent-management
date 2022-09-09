import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({

  "& .MuiDialogContent-root": {
    padding: 0,
    borderBottom:"solid 1px #B2B2B2",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialogTitle-root": {
    background: "#0086FF",
    color: "#ffffff",
    padding: "8px 16px",
  },
  "& .MuiIconButton-root": {
    padding: "4px",
  },
  "& .MuiDialogActions-root": {
    padding: "15px 10px 10px 5px!important",
    display:"flex",
    justifyContent:"flex-end!important",
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#ffffff",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
  const { open, onClose, titleText = "", children } = props;

  const handleClose = () => {
    onClose(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ '& .MuiDialog-paper': { width: '100%',maxWidth:"700px",height:"100%",borderRadius:'10px' } }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {titleText}
        </BootstrapDialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        <DialogActions>
          <Button
            style={{ padding: "6px 0px", width: "100px" }}
            variant="outlined"
            size="medium"
            className="btn-orange-outline"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            style={{ padding: "6px 0px", width: "100px" }}
            variant="contained"
            size="medium"
            className="btn-orange"
            onClick={handleClose}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
