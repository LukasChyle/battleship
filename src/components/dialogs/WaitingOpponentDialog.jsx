import {Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import AlertDialog from "./AlertDialog.jsx";
import {useEffect, useState} from "react";
import {useIntl} from "react-intl";
import {messages} from "../game/Game.messages.js";

export default function WaitingOpponentDialog({isOpen, handleLeave, isPlayingWithFriend, gameId}) {
    const intl = useIntl()
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
                {isPlayingWithFriend ?
                    <>
                        <Typography whiteSpace="pre-line"
                                    variant="h5" sx={{fontWeight: "bold", color: "black"}}>
                            {intl.formatMessage(messages.waitingFriendDialogContent) + ":"}
                        </Typography>
                        <Typography whiteSpace="pre-line" variant="h6" sx={{fontWeight: "bold", color: "#ff6333"}}>
                            {gameId}
                        </Typography>
                    </> :
                    <Typography variant="h5" sx={{fontWeight: "bold", color: "black"}}>
                        {intl.formatMessage(messages.waitingOpponentDialogContent)}
                    </Typography>}
            </DialogTitle>
            <DialogContent sx={{display: "grid", justifyContent: "center"}}>
                <Typography variant="h5" sx={{fontWeight: "bold", color: "black"}}>{minutes}:{seconds}</Typography>
            </DialogContent>
            <DialogActions>
                <AlertDialog
                    dialogButtonText={intl.formatMessage(messages.leaveGameButton)}
                    acceptDialogButtonText={intl.formatMessage(messages.leaveButton)}
                    cancelDialogButtonText={intl.formatMessage(messages.stayButton)}
                    title={intl.formatMessage(messages.leaveGameAlertDialog)}
                    onAccept={handleLeave}/>
            </DialogActions>
        </Dialog>
    );
}