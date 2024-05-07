import {ListItemText, Paper, useTheme} from "@mui/material";

export default function GameState({state}) {
    const theme = useTheme()

    const getGameState = () => {
        if (state === "WAITING_OPPONENT") {
            return {string: "Waiting for an opponent to join"}
        } else if (state === "TURN_OWN") {
            return {string: "Your turn to attack", color: theme.palette.customText.green}
        } else if (state === "TURN_OPPONENT") {
            return {string: "Enemy's turn to attack", color: theme.palette.customText.blue}
        } else if (state === "OPPONENT_LEFT") {
            return {string: "Opponent left the game", color: "red"}
        } else if (state === "WON") {
            return {string: "YOU WON!", color: "green"}
        } else if (state === "LOST") {
            return {string: "You lost", color: "red"}
        } else if (state === "TIMEOUT_OWN") {
            return {string: "Turn expired, you lost", color: "red"}
        } else if (state === "TIMEOUT_OPPONENT") {
            return {string: "Turn expired, You won!", color: "green"}
        } else if (state === "NO_GAME") {
            return {string: "The game you tried to reconnect don't exist anymore.", color: "red"}
        }
        return {string: "No state given by server"}
    }

    const values = getGameState()
    const style =
        state === "WON" ||
        state === "LOST" ||
        state === "OPPONENT_LEFT" ||
        state === "TIMEOUT_OWN" ||
        state === "TIMEOUT_OPPONENT" ?
            {
                variant: "h5",
                fontWeight: "bold",
                color: values?.color
            } : {
                variant: "h6",
                fontWeight: "normal",
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