import SetUpGameBoard from "../../gameBoards/setUpGameBoard/SetUpGameBoard.jsx";
import {Button, Grid, ListItemText, Paper} from "@mui/material";

export default function GameSetUp({ships, onShips, onHasStartedGame}) {

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
            <Grid container spacing={1}>
                <Grid item xs={1} md={2}/>
                <Grid item xs={8} md={5} style={boardGridStyle}>
                    <Paper elevation={7} style={{marginTop: "24px"}}>
                        <SetUpGameBoard ships={ships} onShips={onShips}/>
                    </Paper>
                </Grid>
                <Grid item xs={3} md={5} style={buttonGridStyle}>
                    <Paper elevation={3} style={{padding: "24px"}}>
                        <ListItemText
                            primary={"Step 1:"}
                            secondary={"Place the ship on the board as you want them."}
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
                            <Button
                                size="large"
                                variant="contained"
                                color="primary"
                                onClick={() => onHasStartedGame(true)}
                            >
                                Start Game
                            </Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}