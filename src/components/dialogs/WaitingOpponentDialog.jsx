import {Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import AlertDialog from "./AlertDialog.jsx";
import {useEffect, useRef, useState} from "react";

export default function WaitingOpponentDialog({isOpen, handleLeave}) {

    const [timer, setTimer] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    let timeInterval = useRef(null)

    useEffect(() => {
        isOpen? handleStart() : handleReset()
    }, [isOpen])

    const handleStart = () => {
        if (isRunning) {
            return
        }
        setIsRunning(true)
        timeInterval.current = setInterval(() => {
            setTimer((prev) => prev + 1)
        }, 100)
    };

    const handleReset = () => {
        setIsRunning(false)
        clearInterval(timeInterval.current)
        setTimer(0)
    };

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