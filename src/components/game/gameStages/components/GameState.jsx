import {ListItemText, Paper} from "@mui/material";

export default function GameState({state}) {

    const getGameState = () => {
        if (state === "WAITING_OPPONENT") {
            return {string: "Waiting for an opponent to join"}
        } else if (state === "TURN_OWN") {
            return {string: "Your turn to strike"}
        } else if (state === "TURN_OPPONENT") {
            return {string: "Opponent turn to strike"}
        } else if (state === "OPPONENT_LEFT") {
            return {string: "Opponent left the game", color: "red"}
        } else if (state === "WON") {
            return {string: "YOU WON!", color: "green"}
        } else if (state === "LOST") {
            return {string: "You lost", color: "red"}
        }
        return {string: "No state given by server"}
    }

    const values = getGameState()
    const style =  {
        variant: state === "WON" || state === "LOST" || state === "OPPONENT_LEFT"? "h5" : "h6",
        fontWeight: state === "WON" || state === "LOST" || state === "OPPONENT_LEFT"? "bold" : "normal",
        color: values?.color
    }

    return (
        <Paper elevation={5} sx={{padding: "20px"}}>
            <ListItemText
                sx={{
                    textAlign: "center"
                }}
                primary={"Game state:"}
                secondary={values.string}
                primaryTypographyProps={{variant: "h5", fontWeight: "bold"}}
                secondaryTypographyProps={style}
            />
        </Paper>
    )
}