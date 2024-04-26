import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

export default function WaitingOpponentDialog({isOpen, handleLeaveGame}) {
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
                <Button type="submit" size={"small"} color="error" variant="contained" onClick={() => {
                    if (window.confirm('Are you sure you want to cancel game?')) {
                        handleLeaveGame()
                    }
                }}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}