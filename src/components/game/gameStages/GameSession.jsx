import OwnGameBoard from "../../gameBoards/ownGameBoard/OwnGameBoard.jsx";
import OpponentGameBoard from "../../gameBoards/opponentGameBoard/OpponentGameBoard.jsx";
import {Alert, Button, Grid, Paper, Snackbar, Typography} from "@mui/material";
import GameMessageLogList from "../../lists/GameMessageLogList.jsx";
import {useEffect, useState} from "react";
import useWebSocket from "react-use-websocket";
import WaitingOpponentDialog from "../../dialogs/WaitingOpponentDialog.jsx";

export default function GameSession({
    ships,
    onShips,
    onHasStartedGame,
}) {
    const [openWaitingDialog, setOpenWaitingDialog] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [isOwnTurn, setIsOwnTurn] = useState(true);
    const [opponentStrikes, setOpponentStrikes] = useState([]);
    const [ownStrikes, setOwnStrikes] = useState([]);
    const [gameLogMessages, setGameLogMessages] = useState([]);
    const [gameId, setGameId] = useState("");

    const WS_URL = 'ws://localhost:8000/play'
    const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(WS_URL)

    useEffect(() => {
        if (readyState === 1) {
            sendJsonMessage({
                type: "JOIN",
                gameId: null,
                row: null,
                column: null,
                ships: ships
            })
        }
    }, [readyState]);

    useEffect(() => {
        console.log(lastJsonMessage) // TODO:

        if (lastJsonMessage?.strikeRow && lastJsonMessage?.strikeCol) {
            createGameLogMessage()
        }
        if (lastJsonMessage?.opponentStrikes && lastJsonMessage?.ownStrikes) {
            setOpponentStrikes(lastJsonMessage.opponentStrikes)
            setOwnStrikes(lastJsonMessage.ownStrikes)
        }
        if (lastJsonMessage?.gameId) {
            setGameId(lastJsonMessage?.gameId)
        }
        if (lastJsonMessage?.ships) {
            onShips(lastJsonMessage?.ships)
        }

        switch (lastJsonMessage?.type) {
            case "WAITING_OPPONENT" : {
                setOpenWaitingDialog(true)
            }
                break
            case "TURN_OWN" : {
                if (openWaitingDialog) {
                    setOpenWaitingDialog(false)
                }
                setIsOwnTurn(true)
            }
                break
            case "TURN_OPPONENT" : {
                if (openWaitingDialog) {
                    setOpenWaitingDialog(false)
                }
                setIsOwnTurn(false)
            }
                break
            case "WON" : {
                // TODO: open dialog
            }
                break
            case "LOST" : {
                // TODO: open dialog
            }
                break
            case "OPPONENT_LEFT" : {
                // TODO: open dialog
            }
                break
        }
    }, [lastJsonMessage]);

    const handleStrike = (e) => {
        if (isOwnTurn) {
            if (e !== null) {
                sendJsonMessage({
                    type: "STRIKE",
                    gameId: gameId,
                    row: e.row,
                    column: e.col,
                    ships: null
                })
            }
        } else {
            setShowSnackbar(true)
        }
    }

    const handleLeaveGame = () => {
        sendJsonMessage({
            type: "LEAVE",
            gameId: gameId,
            row: null,
            column: null,
            ships: null
        })
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowSnackbar(false)
    }

    const createGameLogMessage = () => {
        const letter = String.fromCharCode(97 + + lastJsonMessage.strikeRow).toUpperCase()
        console.log(letter)
        const content = `${lastJsonMessage.type === "TURN_OWN" ? "Opponent" : "You"} ${lastJsonMessage.hit ? " hit a ship" : "missed"} at ${letter +(+ lastJsonMessage.strikeCol + 1)}`

        const today = new Date()
        setGameLogMessages(messages => [...messages, {
            isOwnMove: lastJsonMessage.type === "TURN_OPPONENT",
            content: content,
            isHit: lastJsonMessage.hit,
            time: today.getHours() + ":" + today.getMinutes()
        }])
    }

    return (
        <div>
            <WaitingOpponentDialog
                isOpen={openWaitingDialog}
                handleLeaveGame={handleLeaveGame}
            />
            <Button
                style={{margin: "14px"}}
                type="submit"
                size={"small"}
                color="error"
                variant="contained"
                onClick={() => {
                    if (window.confirm('Are you sure you want to cancel game?')) {
                        handleLeaveGame()
                    }
                }}>Leave Game</Button>
            <Grid container spacing={10}>

                <Grid item xs={12} md={5} style={{
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
                    justifyContent: "center",
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
                    <Typography variant="h5" component="div">Action log</Typography>
                    <Paper elevation={3} style={{
                        paddingLeft: "14px",
                        paddingRight: "14px",
                        minHeight: "750px",
                        maxHeight: "750px",
                    }}>
                        <GameMessageLogList
                            style={{alignContent: "top", overflow: "auto"}}
                            messages={gameLogMessages}/>
                    </Paper>
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