import {useState} from "react";

function App() {
    const [boat1, setBoat1] = useState({length: 3, isHorizontal: false, row: 1, col: 1}) // TODO should this be a component instead?

    return (
        <div>
            Hello World!

            <Board/>
        </div>
    )
}

function Board() {
    const [Tiles, setTiles] = useState([]) // TODO: Easier to create a 2d array, or row component?

    function setBoard(onSetTiles){
        let newBoard = [];
        for (let x = 1; x <= 10; x++) {
            for (let y = 1; y <= 10; y++) {
                newBoard.push(<BoardTile key={Number("" + x + y)}/>);
            }
        }
        onSetTiles(newBoard)
    }
    setBoard()
    return (
        <div>
            {
            }
        </div>
    )
}

function BoardTile(/* row = 0, col = 0, */ children) {
    // const row
    // const col

    return (
        <td className="boardTile">

            {children}
        </td>
    )
}

export default App