import {List, Paper} from "@mui/material";
import GameLogMessageListItem from "./GameLogMessageListItem.jsx";

export default function GameLogMessageList({messages}) {

    const messageListStyle = {
        alignContent: "top",
        paddingLeft: "14px",
        overflow: "auto",
        minHeight: "750px",
        maxHeight: "750px",
    }

    return (
        <Paper elevation={3} style={messageListStyle}>
            <List>
                {messages?.map((message, index) => (
                    <GameLogMessageListItem
                        key={index}
                        message={message}
                    />
                ))}
            </List>
        </Paper>
    )
}