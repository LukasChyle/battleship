import {useState} from "react";
import useWebSocket from "react-use-websocket";
import GameSession from "./gameStages/GameSession.jsx";
import GameSetUp from "./gameStages/GameSetUp.jsx";

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
    const [hasGameSession, setHasGameSession] = useState(false);
    const [ships, setShips] = useState(getInitialShips);
    const [opponentStrikes, setOpponentStrikes] = useState(opponentStrikeDummyList);
    const [ownStrikes, setOwnStrikes] = useState(ownStrikeDummyList);

    const WS_URL = 'ws://localhost:8000/play'
    const {sendJsonMessage, lastJsonMessage} = useWebSocket(WS_URL)

    const handleStartGame = () => {
        console.log("handleStartGame")

    }

    const handleTileStrikeClick = (e) => {
        console.log("handleTileStrikeClick", e)
        console.log(lastJsonMessage)

        sendJsonMessage({
            type: "STRIKE",
            gameId: null,
            content: "03",
            ships: null
        })

        setOpponentStrikes(opponentStrikes => [...opponentStrikes, e])
        setOwnStrikes(ownStrikes => [...ownStrikes, {id: e, isHit: true}])
    }

    const handleLeaveGame = () => {
        console.log("handleLeaveGame")

    }

    return (
        <div>
            {
                hasGameSession ?
                    <GameSession ships={ships} ownStrikes={ownStrikes} opponentStrikes={opponentStrikes}
                                 handleTileStrikeClick={handleTileStrikeClick}/>
                    :
                    <GameSetUp ships={ships} onShips={setShips} closeWaitDialogIfTrue={hasGameSession}
                               onLeaveGame={handleLeaveGame} onStartGame={handleStartGame}/>
            }
        </div>
    )
}