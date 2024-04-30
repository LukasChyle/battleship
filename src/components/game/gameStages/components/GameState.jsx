import {ListItemText} from "@mui/material";

export default function GameState({state}) {

    const getGameState = () => {
        if (state === "WAITING_OPPONENT") {
            return {string: "Waiting for an opponent to join", color: "black"}
        } else if (state === "TURN_OWN") {
            return {string: "Your turn to strike", color: "black"}
        } else if (state === "TURN_OPPONENT") {
            return {string: "Opponents turn to strike", color: "black"}
        } else if (state === "OPPONENT_LEFT") {
            return {string: "Opponent left the game", color: "red"}
        } else if (state === "WON") {
            return {string: "YOU WON!", color: "black"}
        } else if (state === "LOST") {
            return {string: "You lost", color: "red"}
        }
        return {string: "No state given by server", color: "black"}
    }

    const values = getGameState()
    const style =  {
        variant: "h6",
        color: values.color,
        webkitTextStrokeWidth: "3px",
        webKitTextFillColor: "black"
    }

    return (
            <ListItemText
                sx={{
                    textAlign: "center"
                }}
                primary={"Game state:"}
                secondary={values.string}
                primaryTypographyProps={{variant: "h5", fontWeight: "bold", color: "darkblue"}}
                secondaryTypographyProps={style}
            />
    )
}