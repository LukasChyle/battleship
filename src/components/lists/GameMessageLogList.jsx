import {List, ListItemText, Paper, useTheme} from "@mui/material";

export default function GameMessageLogList({messages}) {
    const theme = useTheme()

    return (
        <Paper elevation={5} sx={{
            minHeight: "630px",
            maxHeight: "630px",
            minWidth: "280px",
            maxWidth: "280px",
            overflow: 'auto',
            wrap: "nowrap"
        }}>
            <List sx={{margin: "10px"}}>
                {messages?.map((message, index) => (
                    <ListItemText
                        key={index}
                        align="left"
                        primary={message.time + ": " + message.content}
                        sx={{color: message.isOwnMove ? theme.palette.customText.green : theme.palette.customText.blue, fontsize: "small",}}
                        primaryTypographyProps={{fontWeight: message.isHit ? "bold" : "normal", fontSize: "small"}}
                    />
                ))}
            </List>
        </Paper>
    )
}