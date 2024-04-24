import {useState} from "react";
import useWebSocket from "react-use-websocket";
import GameSession from "./GameSession.jsx";
import GameSetUp from "./GameSetUp.jsx";

const getInitialShips = [
    {id: "ship-1", isHorizontal: true, length: 2, row: 1, col: 1},
    {id: "ship-2", isHorizontal: true, length: 2, row: 2, col: 2},
    {id: "ship-3", isHorizontal: true, length: 3, row: 3, col: 3},
    {id: "ship-4", isHorizontal: true, length: 4, row: 4, col: 4},
    {id: "ship-5", isHorizontal: true, length: 5, row: 5, col: 5},
]

const opponentStrikeDummyList = []
const ownStrikeDummyList = []

export default function GameSet() {
    const [ships, setShips] = useState(getInitialShips);
    const [opponentStrikes, setOpponentStrikes] = useState(opponentStrikeDummyList);
    const [ownStrikes, setOwnStrikes] = useState(ownStrikeDummyList);

    const WS_URL = 'http://localhost:8080/play'
    const { SendJsonMessage } = useWebSocket(WS_URL)

    const handleTileStrikeClick = (e) => {
        console.log(e)
        //TODO: Test
        setOpponentStrikes(opponentStrikes => [...opponentStrikes, e])
        setOwnStrikes(ownStrikes => [...ownStrikes, {id:e, isHit: true}])
    }

    return (
        <div>
            <GameSetUp ships={ships} onShips={setShips}/>
            <p> . </p>
            <GameSession ships={ships} ownStrikes={ownStrikes} opponentStrikes={opponentStrikes} handleTileStrikeClick={handleTileStrikeClick} />
        </div>
    )
}