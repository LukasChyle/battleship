import OwnGameBoard from "../../gameBoards/ownGameBoard/OwnGameBoard.jsx";
import OpponentGameBoard from "../../gameBoards/opponentGameBoard/OpponentGameBoard.jsx";
import {Alert, Button, Grid, Paper, Snackbar, Typography} from "@mui/material";
import GameLogMessageList from "../../gameLogMessageList/GameLogMessageList.jsx";
import {useEffect, useState} from "react";
import useWebSocket from "react-use-websocket";
import WaitingOpponentDialog from "../../dialogs/WaitingOpponentDialog.jsx";

export default function GameSession({
    ships,
    onHasStartedGame,
}) {
    const [isWaitDialogOpen, setIsWaitDialogOpen] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [isOwnTurn, setIsOwnTurn] = useState(true);
    const [opponentStrikes, setOpponentStrikes] = useState([]);
    const [ownStrikes, setOwnStrikes] = useState([]);
    const [gameLogMessages, setGameLogMessages] = useState([]);
    const WS_URL = 'ws://localhost:8000/play'
    const {sendJsonMessage, lastJsonMessage} = useWebSocket(WS_URL)

    useEffect(() => {
        console.log(lastJsonMessage)
        // TODO: add message to gameLogMessages
        // TODO: disable and enable game board
        // TODO: process game logic

        const today = new Date()
        setGameLogMessages(messages => [...messages, {
            isOwnMove: true,
            content: "test content",
            time: today.getHours() + ":" + today.getMinutes()
        }])

        // setOpponentStrikes(opponentStrikes => [...opponentStrikes, e])
        // setOwnStrikes(ownStrikes => [...ownStrikes, {id: e, isHit: true}])
    }, [lastJsonMessage]);

    const handleStrike = (e) => {
        if (isOwnTurn) {
            if (e !== null) {
                sendJsonMessage({
                    type: "STRIKE",
                    gameId: null,
                    content: e,
                    ships: null
                })
            }
        } else {
            setShowSnackbar(true)
        }
    }

    const handleLeaveGame = () => {
        console.log("handleLeaveGame")

    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowSnackbar(false)
    }

    return (
        <div>
            <WaitingOpponentDialog
                isOpen={isWaitDialogOpen}
                handleLeaveGame={handleLeaveGame}
            />
            <Grid container spacing={10}>
                <Grid item xs={12} md={1}/>
                <Grid item xs={12} md={4} style={{
                    display: "grid",
                    alignContent: "center",
                    justifyContent: "center",
                    marginTop: "24px",
                }}>
                    <Typography variant="h5" component="div">Your Board</Typography>
                    <Paper elevation={7}>
                        <OwnGameBoard ships={ships} tileStrikes={opponentStrikes}/>
                    </Paper>

                </Grid>
                <Grid item xs={12} md={4} style={{
                    display: "grid",
                    alignContent: "center",
                    justifyContent: "left",
                    marginTop: "24px"
                }}>
                    <Typography variant="h5" component="div">Opponents Board</Typography>
                    <Paper elevation={7}>
                        <OpponentGameBoard handleStrike={handleStrike} tileStrikes={ownStrikes}/>
                    </Paper>

                </Grid>
                <Grid item xs={12} md={2} style={{
                    alignContent: "center",
                    justifyContent: "left",
                    marginTop: "24px"
                }}>
                    <div style={{display: "flex"}}>
                        <Typography variant="h5" component="div">Action log</Typography>
                        <Button type="submit" size={"small"} color="error" variant="contained" onClick={() => {
                            if (window.confirm('Are you sure you want to cancel game?')) {
                                onLeaveGame(true)
                            }
                        }}>Leave Game</Button>
                    </div>
                    <GameLogMessageList messages={gameLogMessages}/>
                </Grid>
            </Grid>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={1500}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    severity="error"
                    variant="filled">
                    Not your turn.
                </Alert>
            </Snackbar>
        </div>
    )
}