import {List, ListItemText, Paper} from "@mui/material";

export default function GameMessageLogList({messages}) {

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
                        sx={{color: message.isOwnMove ? "darkgreen" : "darkblue", fontsize: "small",}}
                        primaryTypographyProps={{fontWeight: message.isHit ? "bold" : "normal", fontSize: "small"}}
                    />
                ))}
            </List>
        </Paper>
    )
}