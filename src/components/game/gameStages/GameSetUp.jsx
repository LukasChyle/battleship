import SetUpGameBoard from "../../gameBoards/setUpGameBoard/SetUpGameBoard.jsx";
import {Button, Grid, ListItemText, Paper, useTheme} from "@mui/material";

export default function GameSetUp({ships, onShips, onIsPlayingGame}) {
    const theme = useTheme()
    const handleStartGame = () => {
        onIsPlayingGame(true)
        window.sessionStorage.setItem("isPlayingGame", true)
        window.sessionStorage.removeItem("messages")
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={0} md={1}/>
                <Grid item xs={6} md={5} sx={{
                    display: "grid",
                    alignContent: "center",
                    justifyContent: "center",
                }}>
                    <Paper elevation={7} sx={{marginTop: "50px"}}>
                        <SetUpGameBoard ships={ships} onShips={onShips}/>
                    </Paper>
                </Grid>
                <Grid item xs={3} md={5} sx={{
                    display: "grid",
                    alignContent: "center",
                    justifyContent: "center",
                }}>
                    <Paper elevation={3} sx={{padding: "24px"}}>
                        <ListItemText
                            primary={"Set up:"}
                            secondary={"Place the ships on the board as you want them, rotate a ship with the arrow button"}
                            primaryTypographyProps={{variant: "h6", fontWeight: "bold"}}
                            secondaryTypographyProps={{variant: "body1", color: theme.palette.text.primary}}
                        />
                        <div style={{marginTop: "30px"}}>
                            <Button
                                size="large"
                                variant="contained"
                                color="primary"
                                onClick={handleStartGame}
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