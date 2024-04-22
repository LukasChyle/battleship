import SetUpPlayboard from "./components/setUpPlayboard/SetUpPlayboard.jsx";
import OwnPlayboard from "./components/ownPlayboard/OwnPlayboard.jsx";
import {useState} from "react";

const getInitialShips = [
    {id: "ship-1", isHorizontal: true, length: 2, row: 1, col: 1},
    {id: "ship-2", isHorizontal: true, length: 2, row: 2, col: 2},
    {id: "ship-3", isHorizontal: true, length: 3, row: 3, col: 3},
    {id: "ship-4", isHorizontal: true, length: 4, row: 4, col: 4},
    {id: "ship-5", isHorizontal: true, length: 5, row: 5, col: 5},
]

const strikeDummyList = ["45", "01", "35", "34", "55", "56", "33"]

function App() {
    const [ships, setShips] = useState(getInitialShips);
    const [opponentStrikes, setOpponentStrikes] = useState(strikeDummyList);

    return (
        <div>
            <SetUpPlayboard ships={ships} onShips={setShips}/>
            <p> . </p>
            <OwnPlayboard ships={ships} tileStrikes={opponentStrikes}/>
        </div>
    )
}

export default App

