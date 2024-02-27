import {List} from "@mui/material";
import {useState} from "react";
import {DndContext, useDraggable, useDroppable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities"

const board = Array.apply(null, Array(10)).map(() => (
    Array.apply(null, Array(10)).map(function () {
    })))

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

const initialShips = [
    {id: "ship-5", isHorizontal: false, length: 2},
    {id: "ship-1", isHorizontal: true, length: 2},
    {id: "ship-2", isHorizontal: true, length: 3},
    {id: "ship-3", isHorizontal: true, length: 4},
    {id: "ship-4", isHorizontal: true, length: 5},
]

function App() {
    const [ships, setShips] = useState(initialShips);
    console.log(loadTileRows()) // TODO: Add rows to useState

    const handleOnDragOver = (e) => {
        if (e.over) {
            console.log(`${e.active.id} was moved over ${e.over.id}.`)
        }
        if (!e.over) {
            console.log(`${e.active.id} is no longer over.`)
        }
    }

    const handleOnDragEnd = (e) => {
        if (e.over) {
            console.log(`${e.active.data.id} was dropped on ${e.over.id}`)
        }
    }

    return (
        <DndContext onDragEnd={handleOnDragEnd} onDragOver={handleOnDragOver}>
            <div>
                <ShipList ships={ships}/>
                <Board tileRows={loadTileRows()}/>
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
    const {setNodeRef} = useDroppable({id: tile.id, data: {row: tile.row, col: tile.col}})
    return (
        <span className="board-tile" ref={setNodeRef}>
            <img src="/src/assets/framed-water.jpg" width={75} height={75} alt="board-tile"/>
            {tile.children}
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

