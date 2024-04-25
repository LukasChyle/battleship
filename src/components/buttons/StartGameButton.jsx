import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import WaitingOpponentDialog from "../dialogs/WaitingOpponentDialog.jsx";

export default function StartGameButton({onClose, onClick, closeDialog}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (closeDialog) {
            setIsDialogOpen(false);
        }
    }, [closeDialog]);

    const handleOnClose = () => {
        onClose()
        setIsDialogOpen(false)
    }

    const handleOnClick = () => {
        onClick()
        setIsDialogOpen(true)
    }

    return (
        <div>
            <WaitingOpponentDialog
                isOpen={isDialogOpen}
                onClose={handleOnClose}
            />
            <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={handleOnClick}
            >
                Start Game
            </Button>
        </div>
    );
}