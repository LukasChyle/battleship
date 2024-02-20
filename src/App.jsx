import {List} from "@mui/material";

const board = Array.apply(null, Array(10)).map(() => (
    Array.apply(null, Array(10)).map(function () {})))

function loadTileRows() {
    return board.map((row, rowIndex) => ({
        rowNumber: rowIndex + 1,
        tiles: row.map((tile, columnIndex) => ({
            id: (rowIndex + "" + columnIndex),
            row: rowIndex + 1,
            col: columnIndex + 1,
            used: false
        }))
    }))
}

const tileRows = loadTileRows()

const initialShips = [
    {id: "ship-5", isHorizontal: false, length: 2},
    {id: "ship-1", isHorizontal: true, length: 2},
    {id: "ship-2", isHorizontal: true, length: 3},
    {id: "ship-3", isHorizontal: true, length: 4},
    {id: "ship-4", isHorizontal: true, length: 5},
]

function App() {
    console.log(tileRows) // TODO: Add rows to useState

    return (
        <div>
            <ShipList ships={initialShips}/>
            <Board tileRows={tileRows}/>
        </div>
    )
}

function Board({tileRows}) {
    return (
        <div>
            {tileRows.map((row) => (
                <div className="board-row" key={row.rowNumber}>
                    {row.tiles.map((tile) => (<BoardTile key={tile.id} tile={tile}/>))}
                </div>
            ))}
        </div>
    )
}

function BoardTile({tile}) {
    console.log("row:" + tile.row + " col:" + tile.col)
    return (
        <span className="board-tile">
                    <img src="src/assets/framed-water.jpg" width={75} height={75} alt="board-tile"/>
        </span>
    )
}

function ShipList({ships}) {
    return (
        <List>
            {ships.map((ship) => (
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

