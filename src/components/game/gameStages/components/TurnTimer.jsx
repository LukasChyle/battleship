import React, {useEffect} from 'react';
import {Typography} from "@mui/material";
import {useIntl} from "react-intl";
import {messages} from "../../Game.messages.js";

export default function TurnTimer({gameState, turnSecondsLeft, setTurnSecondsLeft}) {
    const intl = useIntl()

    useEffect(() => {
        const interval = setInterval(() => {
            setTurnSecondsLeft(prevSeconds => {
                if (prevSeconds > 0) {
                    return prevSeconds - 1;
                } else {
                    clearInterval(interval);
                    return 0;
                }
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [gameState]);

    const minutes = Math.floor(turnSecondsLeft / 60).toString().padStart(2, "0");
    const seconds = (turnSecondsLeft % 60).toString().padStart(2, "0");

    return (
        <div style={{display: "grid", justifyContent: "center"}}>
            {turnSecondsLeft > 0 && (
                <div>
                    <Typography variant="h6" sx={{fontWeight: "bold"}}>
                        {intl.formatMessage(messages.turnTimerTitle) + ":"}
                    </Typography>
                    <Typography variant="h4" color={turnSecondsLeft <= 30 ? "red" : ""}>
                        {minutes}:{seconds}
                    </Typography>
                </div>
            )}
        </div>
    )
};
