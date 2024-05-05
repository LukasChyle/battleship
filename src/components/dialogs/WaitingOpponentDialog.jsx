import {Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import AlertDialog from "./AlertDialog.jsx";
import {useEffect, useState} from "react";

export default function WaitingOpponentDialog({isOpen, handleLeave}) {

    const [timer, setTimer] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevSeconds => {
                if (isOpen) {
                    return prevSeconds + 1;
                } else {
                    clearInterval(interval);
                    return 0;
                }
            });
        }, 100);
        return () => clearInterval(interval);
    }, [isOpen]);

    const formatTime = (timer) => {
        const minutes = Math.floor(timer / 600).toString().padStart(2, "0")
        const seconds = Math.floor((timer / 10) % 60).toString().padStart(2, "0")
        return {minutes, seconds}
    };

    const {minutes, seconds} = formatTime(timer);

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={isOpen}
            aria-labelledby="dialog-title"
        >
            <DialogTitle
                sx={{display: "grid", justifyContent: "center"}}
                fontWeight="bold"
                id="dialog-title">
                {"Waiting for an opponent"}
            </DialogTitle>
            <DialogContent sx={{display: "grid", justifyContent: "center"}}>
                <Typography variant="h5" sx={{fontWeight: "bold", color: "black"}}>{minutes}:{seconds}</Typography>
            </DialogContent>
            <DialogActions>
                <AlertDialog
                    dialogButtonText={"Leave Game"}
                    acceptDialogButtonText={"Leave"}
                    cancelDialogButtonText={"Stay"}
                    title={"Sure you want to leave this game?"}
                    onAccept={handleLeave} />
            </DialogActions>
        </Dialog>
    );
}