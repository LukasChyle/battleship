import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

export default function WaitingOpponentDialog({isOpen, onClose}) {
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
                { "Timer" /* TODO: Timer */}
            </DialogContent>
            <DialogActions>
                <Button size={"small"} onClick={onClose} color="error" variant="contained">
                    Quit
                </Button>
            </DialogActions>
        </Dialog>
    );
}