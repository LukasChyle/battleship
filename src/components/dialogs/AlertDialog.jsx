import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {Fragment, useState} from "react";


export default function AlertDialog({onAccept, title, content, dialogButtonText, acceptDialogButtonText, cancelDialogButtonText}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleAccept = () => {
        onAccept()
        handleClose()
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <Button type="submit" size={"small"} color="error" variant="contained" onClick={handleClickOpen}>
                {dialogButtonText}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{cancelDialogButtonText}</Button>
                    <Button onClick={handleAccept} autoFocus>
                        {acceptDialogButtonText}
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}