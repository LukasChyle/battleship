import {ListItem, ListItemText} from "@mui/material";

export default function GameLogMessageListItem({message}) {

    return (
            <ListItemText align="left" primary={message.time + ": " + message.content} style={{color: message.isOwnMove? "darkgreen" : "darkblue"}} primaryTypographyProps={{fontWeight: "bold"}}/>
    )
}