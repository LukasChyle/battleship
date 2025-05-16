import {Typography, useTheme} from "@mui/material";
import {messages} from "../../Game.messages.js";
import {useIntl} from "react-intl";

export default function SetUpInstructions() {
    const theme = useTheme()
    const intl = useIntl()

    return (
        <>
            <Typography variant="h6" fontWeight="bold" component="div">
                {intl.formatMessage(messages.instructionsTitle) + ":"}
            </Typography>
            <Typography variant="body1" color={theme.palette.text.primary} component="div">
                {"1. " + intl.formatMessage(messages.instructionsPlacement)}
            </Typography>
            <Typography variant="body1" color={theme.palette.text.primary} component="div">
                {"2. " + intl.formatMessage(messages.instructionsStartGame)}
            </Typography>
            <Typography variant="body1" color={theme.palette.text.primary} component="div">
                {intl.formatMessage(messages.instructionsPlayWithFriend)}
            </Typography>
        </>
    )
}