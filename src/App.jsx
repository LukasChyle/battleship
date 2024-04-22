import SetUpPlayboard from "./components/playboards/setUpPlayboard/SetUpPlayboard.jsx";
import OwnPlayboard from "./components/playboards/ownPlayboard/OwnPlayboard.jsx";
import {useState} from "react";
import OpponentPlayboard from "./components/playboards/opponentPlayboard/OpponentPlayboard.jsx";

const getInitialShips = [
    {id: "ship-1", isHorizontal: true, length: 2, row: 1, col: 1},
    {id: "ship-2", isHorizontal: true, length: 2, row: 2, col: 2},
    {id: "ship-3", isHorizontal: true, length: 3, row: 3, col: 3},
    {id: "ship-4", isHorizontal: true, length: 4, row: 4, col: 4},
    {id: "ship-5", isHorizontal: true, length: 5, row: 5, col: 5},
]

const opponentStrikeDummyList = ["45", "01", "35", "34", "55", "56", "33", "19", "12", "82"]
const ownStrikeDummyList = [
    {id: "45", isHit: true},
    {id: "01", isHit: false},
    {id: "35", isHit: true},
    {id: "34", isHit: true},
    {id: "55", isHit: true},
    {id: "56", isHit: true},
    {id: "33", isHit: true},
    {id: "19", isHit: false},
    {id: "12", isHit: true},
    {id: "82", isHit: false}]

function App() {
    const [ships, setShips] = useState(getInitialShips);
    const [opponentStrikes, setOpponentStrikes] = useState(opponentStrikeDummyList);
    const [ownStrikes, setOwnStrikes] = useState(ownStrikeDummyList);

    const handleTileStrikeClick = (e) => {

    }

    return (
        <div>
            <SetUpPlayboard ships={ships} onShips={setShips}/>
            <p> . </p>
            <OwnPlayboard ships={ships} tileStrikes={opponentStrikes}/>
            <p> . </p>
            <OpponentPlayboard onTileClick={handleTileStrikeClick} tileStrikes={ownStrikes}/>
        </div>
    )
}

export default App

