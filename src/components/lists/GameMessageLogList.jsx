import {List, ListItemText} from "@mui/material";

export default function GameMessageLogList({messages, style}) {

    return (
        <List style={style? style : null}>
            {messages?.map((message, index) => (
                <ListItemText
                    key={index}
                    align="left"
                    primary={message.time + ": " + message.content}
                    style={{color: message.isOwnMove ? "darkgreen" : "darkblue"}}
                    primaryTypographyProps={{fontWeight: "bold"}}
                />
            ))}
        </List>
    )
}