import {List} from "@mui/material";
import {useEffect, useState} from "react";
import {DndContext, useDraggable, useDroppable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities"

const getInitialShips = [
    {id: "ship-1", isHorizontal: true, length: 2, row: 1, col: 1},
    {id: "ship-2", isHorizontal: false, length: 2, row: 5, col: 5},
    {id: "ship-3", isHorizontal: false, length: 3, row: 5, col: 6},
    {id: "ship-4", isHorizontal: false, length: 4, row: 5, col: 7},
    {id: "ship-5", isHorizontal: false, length: 5, row: 5, col: 8},
]

const board = Array.apply(null, Array(10)).map(() => (
    Array.apply(null, Array(10)).map(function () {
    })))

const getInitialTiles = () => {
    const tiles = []
    board.forEach((row, rowIndex) => (row.forEach((col, colIndex) => {
        tiles.push({
            id: (rowIndex + "" + colIndex),
            row: rowIndex,
            col: colIndex,
            used: false,
            ship: undefined
        })
    })))
    return tiles
}

function App() {
    const [ships, setShips] = useState(getInitialShips);
    const [tiles, setTiles] = useState(getInitialTiles())
    console.log(ships)
    console.log(tiles)

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

    const handleTiles = () => {
        const tilesToChange = []
        ships.forEach((e) => {
            for (let i = 0; i < e.length; i++) {
                if (e.isHorizontal) {
                    tilesToChange.push({id: (e.row + "" + (e.col + i)), ship: e.col === (e.col + i) ? e : undefined})
                } else {
                    tilesToChange.push({id: ((e.row - i) + "" + e.col), ship: e.row === (e.row + i) ? e : undefined})
                }
            }
        })
        setTiles(tiles.map((e) => {
            const match = tilesToChange.find(t => t.id === e.id)
            return match ? {...e, used: true, ship: match.ship} : e
        }))
    }

    useEffect(() => {
        handleTiles()
    }, [ships]);

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragOver={handleDragOver}>
            <div>
                {/*<ShipList ships={ships}/>*/}
                <Board board={board} tiles={tiles}/>
            </div>
        </DndContext>
    )
}

function Board({board, tiles}) {
    return (
        <div>
            {board.map((row, rowIndex) => (
                <div className="board-row" key={rowIndex}>
                    {row.map((col, colIndex) => (
                        <BoardTile key={colIndex} tile={
                        tiles.find(t => t.id === rowIndex + "" + colIndex)
                    }/>))}
                </div>
            ))}
        </div>
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

function BoardTile(props) {
    const {setNodeRef} = useDroppable({id: props.tile.id, data: {row: props.tile.row, col: props.tile.col}, disabled: props.tile.used})

    return (
        <span className="board-tile" ref={setNodeRef}>
            {props.tile.ship && <Ship id={props.tile.ship.id} key={props.tile.ship.id} isHorizontal={props.tile.ship.isHorizontal}
                                length={props.tile.ship.length}/>}
            <img className="tile-img" src="/src/assets/framed-water.jpg" width={75} height={75} alt="board-tile"/>
        </span>
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
            <img className="ship-img" src={srcString} alt={"Ship"}/>
        </div>
    )
}

export default App

