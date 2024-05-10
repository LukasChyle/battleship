import {ListItemText, Paper, useTheme} from "@mui/material";
import {useIntl} from "react-intl";
import {messages} from "../../Game.messages.js";

export default function GameState({state}) {
    const theme = useTheme()
    const intl = useIntl()

    const getGameState = () => {
        switch (state) {
            case "WAITING_OPPONENT":
                return {string: intl.formatMessage(messages.gameStateWaitingOpponent)}
            case "TURN_OWN":
                return {
                    string: intl.formatMessage(messages.gameStateTurnOwn),
                    color: theme.palette.customText.green
                }
            case "TURN_OPPONENT":
                return {
                    string: intl.formatMessage(messages.gameStateTurnOpponent),
                    color: theme.palette.customText.blue
                }
            case "OPPONENT_LEFT":
                return {
                    string: intl.formatMessage(messages.gameStateOpponentLeft),
                    color: "red"
                }
            case "WON":
                return {
                    string: intl.formatMessage(messages.gameStateWon),
                    color: "green"
                }
            case "LOST":
                return {
                    string: intl.formatMessage(messages.gameStateLost),
                    color: "red"
                }
            case "TIMEOUT_OWN":
                return {
                    string: intl.formatMessage(messages.gameStateTimeoutOwn),
                    color: "red"
                }
            case "TIMEOUT_OPPONENT":
                return {
                    string: intl.formatMessage(messages.gameStateTimeoutOpponent),
                    color: "green"
                }
            case "NO_GAME":
                return {
                    string: intl.formatMessage(messages.gameStateNoGame),
                    color: "red"
                }
            default:
                return ""
        }
    }

    const values = getGameState()
    const style =
        state === "WON" ||
        state === "LOST" ||
        state === "OPPONENT_LEFT" ||
        state === "TIMEOUT_OWN" ||
        state === "TIMEOUT_OPPONENT" ?
            {
                variant: "h5",
                fontWeight: "bold",
                color: values?.color
            } : {
                variant: "h6",
                fontWeight: "normal",
                color: values?.color
            }

    return (
        <Paper elevation={5} sx={{padding: "20px"}}>
            <ListItemText
                sx={{
                    textAlign: "center"
                }}
                primary={intl.formatMessage(messages.gameStateTitle) + ":"}
                secondary={values.string}
                primaryTypographyProps={{variant: "h5", fontWeight: "bold"}}
                secondaryTypographyProps={style}
            />
        </Paper>
    )
}