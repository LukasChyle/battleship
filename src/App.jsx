import {List} from "@mui/material";
import {useState} from "react";
import {DndContext, useDraggable, useDroppable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities"

function getInitialTileRows() {
    const board = Array.apply(null, Array(10)).map(() => (
        Array.apply(null, Array(10)).map(function () {
        })))

    return board.map((row, rowIndex) => ({
        tiles: row.map((tile, columnIndex) => ({
            id: (rowIndex + "" + columnIndex),
            row: rowIndex,
            col: columnIndex,
            used: false,
            ship: undefined
        }))
    }))
}

function getInitialShips() {
    return [
        {id: "ship-1", isHorizontal: true, length: 2, row: 1, col: 1},
        {id: "ship-2", isHorizontal: false, length: 2, row: 5, col: 5},
        {id: "ship-3", isHorizontal: false, length: 3, row: 5, col: 6},
        {id: "ship-4", isHorizontal: false, length: 4, row: 5, col: 7},
        {id: "ship-5", isHorizontal: false, length: 5, row: 5, col: 8},
    ]
}

function App() {
    const [ships, setShips] = useState(getInitialShips);
    const [tileRows, setTilesRows] = useState(getInitialTileRows)
    console.log(ships)
    console.log(tileRows)

    const handleDragStart = (e) => {
    }

    const handleDragOver = (e) => {
        if (e.over) {
            console.log(`${e.active.id} was moved over ${e.over.id}.`)
        }
        if (!e.over) {
            console.log(`${e.active.id} is no longer over.`)
        }
    }

    const handleDragEnd = (e) => {
        if (e.over) {
            console.log(`${e.active.id} was dropped on ${e.over.id}`)
        }
    }

// TODO: make method that iterates through tileRows and puts a ships value inside if col and row is matched, change used to true.
    const handleBoats = () => {
        // TODO: instead of iterating tiles, iterate ships and just match tile id from a map of tiles without rows?
        // TODO: mapOf: ((row + "" + col), {tile info}) hardcode the full map and id?
        tileRows.forEach(r => r.tiles.forEach(t => {
            ships.forEach(s => {
                if (s.row === t.row && s.col === t.col) {
                    // TODO: put boat into the tile.
                }
            })
        }))
    }

// TODO: When a ship is matched to a tile: Create a method that looks at the ship and changes tiles used by the ship to used: true.
    const handleTiles = () => {
// TODO: tile id = (row + "" + col)
    }

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragOver={handleDragOver}>
            <div>
                <ShipList ships={ships}/>
                <Board tileRows={tileRows}/>
            </div>
        </DndContext>
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
    const {setNodeRef} = useDroppable({id: tile.id, data: {row: tile.row, col: tile.col}, disabled: tile.used})
    return (
        <span className="board-tile" ref={setNodeRef}>
            {tile.used && tile.ship && <Ship id={tile.ship.id} key={tile.ship.id} isHorizontal={tile.ship.isHorizontal}
                                             length={tile.ship.length}/>}
            <img src="/src/assets/framed-water.jpg" width={75} height={75} alt="board-tile"/>
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
    const {
        attributes, listeners, setNodeRef, transform
    } = useDraggable({
        id: ship.id,
        data: {length: ship.length, isHorizontal: ship.isHorizontal}
    })

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
        <div
            ref={setNodeRef}
            style={{transform: CSS.Translate.toString(transform)}}
            {...attributes}
            {...listeners}
        >
            <img src={srcString} alt={"Ship"}/>
        </div>
    )
}

export default App

