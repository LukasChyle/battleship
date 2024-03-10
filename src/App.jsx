import {Button, List} from "@mui/material";
import {useEffect, useState} from "react";
import {DndContext, useDraggable, useDroppable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities"

const getInitialShips = [
    {id: "ship-1", isHorizontal: true, length: 2, row: 1, col: 1},
    {id: "ship-2", isHorizontal: true, length: 2, row: 2, col: 2},
    {id: "ship-3", isHorizontal: true, length: 3, row: 3, col: 3},
    {id: "ship-4", isHorizontal: true, length: 4, row: 4, col: 4},
    {id: "ship-5", isHorizontal: true, length: 5, row: 5, col: 5},
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
                <Board board={board} tiles={tiles} ships={ships} onShips={setShips}/>
            </div>
        </DndContext>
    )
}

function Board({board, tiles, ships, onShips}) {
    return (
        <div>
            {board.map((row, rowIndex) => (
                <div className="board-row" key={rowIndex}>
                    {row.map((col, colIndex) => (
                        <BoardTile key={colIndex}
                                   tile={tiles.find(t => t.id === rowIndex + "" + colIndex)}
                                   ships={ships}
                                   onShips={onShips}
                        />))}
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

function BoardTile({tile, ships, onShips}) {
    const {setNodeRef} = useDroppable({
        id: tile.id,
        data: {row: tile.row, col: tile.col},
        disabled: tile.used
    })
    return (
        <span className="board-tile" ref={setNodeRef}>
            {tile.ship && <Ship
                id={tile.ship.id}
                key={tile.ship.id}
                isHorizontal={tile.ship.isHorizontal}
                length={tile.ship.length}
                ships={ships}
                onShips={onShips}
            />}
            <img className="tile-img" src="/src/assets/framed-water.jpg" width={75} height={75} alt="board-tile"/>
        </span>
    )
}

function Ship({id, isHorizontal, length, ships, onShips}) {
    const {
        attributes, listeners, setNodeRef, transform
    } = useDraggable({
        id: id,
        data: {length: length, isHorizontal: isHorizontal}
    })
    let srcString = "";
    let className = "";
    if (isHorizontal) {
        switch (length) {
            case 2 :
                srcString = "src/assets/ship_4.png"
                className = "img-ship-4"
                break
            case 3 :
                srcString = "src/assets/ship_3.png"
                className = "img-ship-3"
                break
            case 4 :
                srcString = "src/assets/ship_2.png"
                className = "img-ship-2"
                break
            case 5 :
                srcString = "src/assets/ship_1.png"
                className = "img-ship-1"
                break
        }
    } else {
        switch (length) {
            case 2 :
                srcString = "src/assets/ship_4_vert.png"
                className = "img-ship-4-vert"
                break
            case 3 :
                srcString = "src/assets/ship_3_vert.png"
                className = "img-ship-3-vert"
                break
            case 4 :
                srcString = "src/assets/ship_2_vert.png"
                className = "img-ship-2-vert"
                break
            case 5 :
                srcString = "src/assets/ship_1_vert.png"
                className = "img-ship-1-vert"
                break
        }
    }

    const buttonStyle = {
        fontSize: 20,
        marginTop: "4px",
        marginLeft: "4px",
        maxWidth: '20px',
        maxHeight: '20px',
        minWidth: '20px',
        minHeight: '20px'
    }
    // TODO: create button on tile with ship that can rotate the ship.
    // TODO: when hovering on the button: highlight the tiles that will be rotated too and if possible.
    const handleButtonClick = () => {
        console.log("clicked+")
        onShips(ships.map((e) => {
            return e.id === id ? {...e, isHorizontal: isHorizontal => !isHorizontal} : e
        }))
    }
    // FixMe: Draggable not working properly with position absolute.
    // FixMe: button onClick not working, probably because of draggable.
    return (
        <div
            ref={setNodeRef}
            style={{transform: CSS.Translate.toString(transform)}}
            {...attributes}
            {...listeners}
        >
            <div style={{position: "absolute"}}>
                <Button onClick={handleButtonClick} style={buttonStyle}>{isHorizontal ? "⬇️" : "➡️"}</Button>
                <img className={className} src={srcString} alt={"Ship"}/>
            </div>

        </div>
    )
}

export default App

