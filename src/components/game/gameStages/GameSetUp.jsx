import SetUpGameBoard from "../../gameBoards/setUpGameBoard/SetUpGameBoard.jsx";
import {Button, Grid, ListItemText, Paper, useTheme} from "@mui/material";
import {useIntl} from "react-intl";
import {messages} from "../Game.messages.js";
import GameStatistics from "../../statistics/GameStatistics.jsx";
import StartMenu from "./components/StartMenu.jsx";

export default function GameSetUp({
    ships,
    setShips,
    setIsPlayingGame,
    setIsPlayingWithFriend,
    joinGameCode,
    setJoinGameCode
}) {
    const theme = useTheme()
    const intl = useIntl()
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
                                <ListItemText
                                    primary={intl.formatMessage(messages.instructionsTitle) + ":"}
                                    secondary={intl.formatMessage(messages.instructionsContent)}
                                    primaryTypographyProps={{variant: "h6", fontWeight: "bold"}}
                                    secondaryTypographyProps={{variant: "body1", color: theme.palette.text.primary}}
                                />
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