import {ListItemText} from "@mui/material";

export default function ConnectionStatusBox({state}) {

    const getGameState = () => {
        if (state === 0) {
            return {string: "Connecting", color: "khaki"}
        } else if (state === 1) {
            return {string: "Connected", color: "lightgreen"}
        } else if (state === 2) {
            return {string: "Closing", color: "khaki "}
        } else if (state === 3) {
            return {string: "Disconnected", color: "lightcoral"}
        } else {
            return {string: "Error", color: "lightgray"}
        }
    }
    const values = getGameState()

    return (
        <div>
            <ListItemText
                primary={"Game state:"}
                secondary={"Place the ships on the board as you want them, rotate a ship with the arrow button"}
                primaryTypographyProps={{variant: "h5", fontWeight: "bold", color: "darkblue"}}
                secondaryTypographyProps={{variant: "h6", color: "black"}}
            />
        </div>
    )
}