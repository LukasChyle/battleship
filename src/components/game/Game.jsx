import {useEffect, useState} from "react";
import useWebSocket from "react-use-websocket";
import GameSession from "./gameStages/GameSession.jsx";
import GameSetUp from "./gameStages/GameSetUp.jsx";
import {Alert, Snackbar} from "@mui/material";

const getInitialShips = [
    {id: "ship-1", isHorizontal: true, length: 2, row: 1, col: 1},
    {id: "ship-2", isHorizontal: true, length: 2, row: 2, col: 2},
    {id: "ship-3", isHorizontal: true, length: 3, row: 3, col: 3},
    {id: "ship-4", isHorizontal: true, length: 4, row: 4, col: 4},
    {id: "ship-5", isHorizontal: true, length: 5, row: 5, col: 5},
]

const opponentStrikeDummyList = []
const ownStrikeDummyList = []

export default function Game() {
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [hasGameSession, setHasGameSession] = useState(true);
    const [ships, setShips] = useState(getInitialShips);
    const [isOwnTurn, setIsOwnTurn] = useState(true);
    const [opponentStrikes, setOpponentStrikes] = useState(opponentStrikeDummyList);
    const [ownStrikes, setOwnStrikes] = useState(ownStrikeDummyList);
    const [gameLogMessages, setGameLogMessages] = useState([]);

    const handleStartGame = () => {
        console.log("handleStartGame")
    }
    // TODO: Fix so received message, backend doesn't sent anything.
    // TODO: Move inside of handleStartGame and be able to use send sendJsonMessage & lastJsonMessage from rest of class
    const WS_URL = 'ws://localhost:8000/play'
    const {sendJsonMessage, lastMessage} = useWebSocket(WS_URL)

    useEffect(() => {
        console.log(lastMessage)
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
    }, [lastMessage]);

    const handleTileStrikeClick = (e) => {
        if (isOwnTurn) {
            sendJsonMessage({
                type: "STRIKE",
                gameId: null,
                content: e,
                ships: null
            })
            console.log(lastMessage)
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
            {
                hasGameSession ?
                    <GameSession ships={ships} ownStrikes={ownStrikes} opponentStrikes={opponentStrikes}
                                 handleTileStrikeClick={handleTileStrikeClick} gameLogMessages={gameLogMessages}/>
                    :
                    <GameSetUp ships={ships} onShips={setShips} closeWaitDialogIfTrue={hasGameSession}
                               onLeaveGame={handleLeaveGame} onStartGame={handleStartGame}/>
            }
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