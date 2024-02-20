import {List} from "@mui/material";

const board = [
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
]

const initialShips = [
    {id: "ship-5", isHorizontal: false, length: 2},
    {id: "ship-1", isHorizontal: true, length: 2},
    {id: "ship-2", isHorizontal: true, length: 3},
    {id: "ship-3", isHorizontal: true, length: 4},
    {id: "ship-4", isHorizontal: true, length: 5},
]

function App() {
    // const [ship1, setShip1] = useState({position: {row: 0, col: 0}, isHorizontal: true, length: 2})
    // const [ship2, setShip2] = useState({position: {row: 0, col: 0}, isHorizontal: true, length: 3})
    // const [ship3, setShip3] = useState({position: {row: 0, col: 0}, isHorizontal: true, length: 3})
    // const [ship4, setShip4] = useState({position: {row: 0, col: 0}, isHorizontal: true, length: 4})
    // const [ship5, setShip5] = useState({position: {row: 0, col: 0}, isHorizontal: true, length: 5})

    return (
        <div>
            <ShipList ships={initialShips}/>
            <Board/>
        </div>
    )
}

function Board() {
    return (
        <div>
            {board.map((row, rowIndex) => (
                <div className="board-row" key={rowIndex}>
                    {row.map((cell, columnIndex) => (
                        <BoardTile key={cell} row={rowIndex} col={columnIndex}>{cell}</BoardTile>
                    ))}
                </div>
            ))}
        </div>
    )
}

function BoardTile(tile) {
    console.log("row:" + tile.row + " col:" + tile.col + " child:" + tile.children)

    return (
        <span className="board-tile">
                    <img src="src/assets/framed-water.jpg" width={75} height={75} alt="board-tile"/>
            </span>
    )
}

function ShipList({ships}) {
    return (
        <List>
            {ships.map((ship, index) => (
                <Ship key={ship.id} id={ship.id} isHorizontal={ship.isHorizontal}
                      length={ship.length}/>
            ))}
        </List>
    )
}

function Ship(ship) {
    console.log("id:" + ship.id + " isHorizontal:" + ship.isHorizontal + " length:" + ship.length)

    let srcString = "";
    if (ship.isHorizontal) {
        switch (ship.length) {
            case 2 :
                srcString = "src/assets/Boat_4.png"
                break
            case 3 :
                srcString = "src/assets/Boat_3.png"
                break
            case 4 :
                srcString = "src/assets/Boat_2.png"
                break
            case 5 :
                srcString = "src/assets/Boat_1.png"
                break
        }
    } else {
        switch (ship.length) {
            case 2 :
                srcString = "src/assets/Boat_4_vert.png"
                break
            case 3 :
                srcString = "src/assets/Boat_3_vert.png"
                break
            case 4 :
                srcString = "src/assets/Boat_2_vert.png"
                break
            case 5 :
                srcString = "src/assets/Boat_1_vert.png"
                break
        }
    }
    return (
        <div>
            <img src={srcString} alt={"Ship"}/>
        </div>
    )
}

export default App

