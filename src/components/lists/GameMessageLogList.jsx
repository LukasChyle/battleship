import {List, ListItemText} from "@mui/material";

export default function GameMessageLogList({messages, style}) {

    const getStyle = (e) => { return {
        color: e.isOwnMove? "darkgreen" : "darkblue",
        fontsize: "small",
    }}

    return (
        <List style={style ? style : null}>
            {messages?.map((message, index) => (
                <ListItemText
                    key={index}
                    align="left"
                    primary={message.time + ": " + message.content}
                    style={getStyle(message)}
                    primaryTypographyProps={{fontWeight: message.isHit? "bold" : "normal", fontSize: "small"}}
                />
            ))}
        </List>
    )
}