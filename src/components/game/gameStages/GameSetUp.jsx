import SetUpPlayboard from "../../playboards/setUpPlayboard/SetUpPlayboard.jsx";
import StartGameButton from "../../buttons/StartGameButton.jsx";
import {Grid, ListItemText, Typography} from "@mui/material";

export default function GameSetUp({ships, onShips, closeWaitDialogIfTrue, onLeaveGame, onStartGame}) {

    const boardGridStyle = {
        display: "grid",
        alignContent: "center",
        justifyContent: "center",
    }

    const buttonGridStyle = {
        display: "grid",
        alignContent: "center",
        justifyContent: "left",
    }

    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={1} sm={2} style={boardGridStyle}>
                </Grid>
                <Grid item xs={8} sm={6} style={boardGridStyle}>
                    <SetUpPlayboard ships={ships} onShips={onShips}/>
                </Grid>
                <Grid item xs={3} sm={4} style={buttonGridStyle}>
                    <ListItemText
                        primary={"Step 1:"}
                        secondary={"Place the boats on the board as you want them."}
                        primaryTypographyProps={{variant: "h5", fontWeight: "bold", color: "darkblue"}}
                        secondaryTypographyProps={{variant: "h6", color: "black"}}
                    />
                    <ListItemText
                        primary={"Step 2:"}
                        secondary={"When ready, click on the start game button and connect to a opponent."}
                        primaryTypographyProps={{variant: "h5", fontWeight: "bold", color: "darkblue"}}
                        secondaryTypographyProps={{variant: "h6", color: "black"}}
                    />
                    <div style={{marginTop: "30px"}}>
                        <StartGameButton onClose={onLeaveGame} closeDialog={closeWaitDialogIfTrue}
                                         onClick={onStartGame}/>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}