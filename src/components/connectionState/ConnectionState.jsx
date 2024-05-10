import {Box, Typography, useTheme} from "@mui/material";
import {useIntl} from "react-intl";
import {messages} from "./ConnectionState.messages.js";

export default function ConnectionState({style, state}) {
    const theme = useTheme()
    const intl = useIntl()

    const getConnectionState = () => {
        if (state === 0) {
            return {string: intl.formatMessage(messages.connecting), color: theme.palette.connection.connecting}
        } else if (state === 1) {
            return {string: intl.formatMessage(messages.open), color: theme.palette.connection.connected}
        } else if (state === 2) {
            return {string: intl.formatMessage(messages.closing), color: theme.palette.connection.closing}
        } else if (state === 3) {
            return {string: intl.formatMessage(messages.closed), color: theme.palette.connection.disconnected}
        } else {
            return {string: intl.formatMessage(messages.uninstantiated), color: theme.palette.connection.error}
        }
    }
    const values = getConnectionState()

    return (
        <div style={style}>
            <Typography variant="caption" sx={{
                fontWeight: "bold",
                color: theme.palette.connection.title
            }}>
                {intl.formatMessage(messages.title)}
            </Typography>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height={30}
                width={100}
                sx={{
                    borderRadius: "5px",
                    border: `1px solid ${theme.palette.connection.border}`,
                    backgroundColor: values.color,
                    fontWeight: "bold"
                }}
            >
                <Typography variant="caption" sx={{fontWeight: "bold", color: theme.palette.connection.text}}>
                    {values.string}
                </Typography>
            </Box>
        </div>
    )
}