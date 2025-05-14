import SetUpGameBoard from "../../gameBoards/setUpGameBoard/SetUpGameBoard.jsx";
import {Grid, Paper} from "@mui/material";
import GameStatistics from "../../statistics/GameStatistics.jsx";
import StartMenu from "./components/StartMenu.jsx";
import SetUpInstructions from "./components/SetUpInstructions.jsx";

export default function GameSetUp({
    ships,
    setShips,
    setIsPlayingGame,
    setIsPlayingWithFriend,
    joinGameCode,
    setJoinGameCode
}) {
    const handleStartGame = (isWithFriend) => {
        setIsPlayingWithFriend(isWithFriend)
        setIsPlayingGame(true)
        window.sessionStorage.setItem("isPlayingGame", true)
        window.sessionStorage.removeItem("messages")
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} md={8} sx={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    marginTop: "50px"
                }}>
                    <SetUpGameBoard ships={ships} setShips={setShips}/>
                </Grid>

                <Grid item xs={12} md={3} sx={{
                    display: "grid",
                    alignContent: "center",
                    justifyContent: "center",
                    marginTop: "50px"
                }}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>

                            <GameStatistics refresh={setIsPlayingGame}/>
                        </Grid>
                        <Grid item>
                            <Paper elevation={3} sx={{padding: "24px"}}>
                                <SetUpInstructions/>
                                <StartMenu
                                    handleStartGame={handleStartGame}
                                    ships={ships}
                                    setJoinGameCode={setJoinGameCode}
                                    joinGameCode={joinGameCode}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}