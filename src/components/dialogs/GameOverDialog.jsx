import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, useTheme} from "@mui/material";
import {useIntl} from "react-intl";
import {messages} from "../game/Game.messages.js";
import GameStateFormatter from "../logic/GameStateFormatter.js";

export default function GameOverDialog({isOpen, state, handleLeave}) {
    const intl = useIntl()
    const theme = useTheme()
    const stateFormatter = new GameStateFormatter(intl, theme)
    const stateMessage = stateFormatter.getStateMessage(state)

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={isOpen}
            aria-labelledby="dialog-title"
        >
            <DialogContent sx={{display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "200px"}}>
                <Typography variant="h4" sx={{
                    fontWeight: "bold",
                    color: stateMessage?.color ? stateMessage.color : "black",
                    textAlign: "center",
                    mb: 2
                }}>{stateMessage?.string}</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{boxShadow: 5}}
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={handleLeave}>
                    {intl.formatMessage(messages.leaveGameButton)}
                </Button>
            </DialogActions>
        </Dialog>
    );
}