import SetUpGameBoard from "../../gameBoards/setUpGameBoard/SetUpGameBoard.jsx";
import {Button, Grid, ListItemText, Paper, Typography} from "@mui/material";

export default function GameSetUp({ships, onShips, onPlayGame}) {

    const boardGridStyle = {
        display: "grid",
        alignContent: "center",
        justifyContent: "center",
    }

    const buttonGridStyle = {
        display: "grid",
        alignContent: "center",
        justifyContent: "center",
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={0} md={1}/>
                <Grid item xs={6} md={5} style={boardGridStyle}>
                    <Paper elevation={7} style={{marginTop: "24px"}}>
                        <SetUpGameBoard ships={ships} onShips={onShips}/>
                    </Paper>
                </Grid>
                <Grid item xs={3} md={5} style={buttonGridStyle}>
                    <Paper elevation={3} style={{padding: "24px"}}>
                        <ListItemText
                            primary={"Set up:"}
                            secondary={"Place the ships on the board as you want them, rotate a ship with the arrow button"}
                            primaryTypographyProps={{variant: "h6", fontWeight: "bold", color: "darkblue"}}
                            secondaryTypographyProps={{variant: "body1", color: "black"}}
                        />
                        <div style={{marginTop: "30px"}}>
                            <Button
                                size="large"
                                variant="contained"
                                color="primary"
                                onClick={() => onPlayGame(true)}
                            >
                                Start Game
                            </Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={0} md={1}/>
            </Grid>
        </div>
    )
}