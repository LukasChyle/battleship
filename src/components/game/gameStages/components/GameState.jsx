import {alpha, darken, lighten, ListItemText, Paper, useTheme} from "@mui/material";
import {useIntl} from "react-intl";
import {messages} from "../../Game.messages.js";
import GameStateFormatter from "../../../logic/GameStateFormatter.js";

export default function GameState({state}) {
    const intl = useIntl()
    const theme = useTheme()
    const isDarkMode = theme.palette.mode === 'dark';
    const stateFormatter = new GameStateFormatter(intl, theme)
    const stateMessage = stateFormatter.getStateMessage(state)

    const backgroundColor = stateMessage?.color ?
        alpha((isDarkMode ? darken(stateMessage.color, 0.6) :
            lighten(stateMessage?.color, 0.4)), 0.5) : 'transparent';

    return (
        <Paper elevation={5}>
            <div style={{backgroundColor: backgroundColor, padding: "20px"}}>
                <ListItemText
                    sx={{
                        textAlign: "center"
                    }}
                    primary={intl.formatMessage(messages.gameStateTitle) + ":"}
                    secondary={stateMessage.string}
                    primaryTypographyProps={{variant: "h5", fontWeight: "bold"}}
                    secondaryTypographyProps={{variant: "h6", fontWeight: "bold", color: stateMessage?.color}}/>
            </div>
        </Paper>
    )
}