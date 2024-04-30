import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import AlertDialog from "./AlertDialog.jsx";

export default function WaitingOpponentDialog({isOpen, handleLeave}) {
    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={isOpen}
            aria-labelledby="dialog-title"
        >
            <DialogTitle id="dialog-title">
                Wait for an opponent
            </DialogTitle>
            <DialogContent>
                { "Timer" /* TODO: implement an timer, here and in backend. */}
            </DialogContent>
            <DialogActions>
                <AlertDialog
                    dialogButtonText={"Leave Game"}
                    acceptDialogButtonText={"Leave"}
                    cancelDialogButtonText={"Stay"}
                    title={"Are you sure you want to leave this game?"}
                    onAccept={handleLeave} />
            </DialogActions>
        </Dialog>
    );
}