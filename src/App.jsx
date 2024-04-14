import {Button, Grid} from "@mui/material";
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

    useEffect(() => {
        handleTiles()
    }, [ships]);

    console.log(ships)
    console.log(tiles)

    const handleDragStart = (e) => {
    }

    const handleDragOver = (e) => {
        if (e.over) {
            console.log(`${e.active.id} was moved over ${e.over.id}.`)
            console.log("Can be laid: " + canBeLaid(
                e.active.data.current.length,
                e.active.data.current.isHorizontal,
                e.over.data.current.row,
                e.over.data.current.col,
                e.active.data.current.row,
                e.active.data.current.col))
        }
        if (!e.over) {
            console.log(`${e.active.id} is no longer over.`)
        }
        // TODO: Check if ship are allowed to be dropped, color the tiles green or red.
    }

    const handleDragEnd = (e) => {

        // TODO: Check if ship are allowed to be dropped, verify length to edge and if any tiles are already used.
        if (!e.over) {
            return
        }
        if (!canBeLaid(
            e.active.data.current.length,
            e.active.data.current.isHorizontal,
            e.over.data.current.row,
            e.over.data.current.col,
            e.active.data.current.row,
            e.active.data.current.col)) {
            return
        }
        console.log(`${e.active.id} was dropped on ${e.over.id}`)
        setShips(ships.map((ship) => {
            const match = e.active.id === ship.id
            return match ? {...ship, row: e.over.data.current.row, col: e.over.data.current.col} : ship
        }))
        // FixMe: ship are blinking on old location before placement.
    }

    const handleTiles = () => {
        //FixMe: when laid on current used tile or another used tile, it jumps to another place.
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
            return match ? {...e, used: true, ship: match.ship} : {...e, used: false, ship: undefined}
        }))
    }

    const canBeLaid = (length, isHorizontal, overRow, overCol, currentRow, currentCol) => {
        if (isHorizontal) {
            if (length + overCol > 10) {
                return false
            }
        } else {
            if (length + overRow > 10) {
                return false
            }
        }
        const currentTiles = []
        for (let i = 0; i < length; i++) {
            isHorizontal? currentTiles.push({id: currentRow + "" + (currentCol + i)}) : currentTiles.push({id:(currentRow + i) + "" + currentCol})
        }
        for (let i = 0; i < length; i++) {
            if (isHorizontal) {
                if (tiles.find(e => e.id === overRow + "" + (overCol + i)).used && !currentTiles.find(e => e.id === overRow + "" + (overCol + i))) {
                    return false
                }
            } else {
                if (tiles.find(e => e.id === (overRow + i) + "" + overCol).used && !currentTiles.find(e => e.id === (overRow + i) + "" + overCol)) {
                    return false
                }
            }
        }
        return true
    }

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragOver={handleDragOver}>
            <div>
                <Board board={board} tiles={tiles} ships={ships} onShips={setShips}/>
            </div>
        </DndContext>
    )
}

function Board({board, tiles, ships, onShips}) {
    return (
        <Grid container>
            {board.map((col, colIndex) => (
                <Grid className="board-row" key={colIndex}>
                    {col.map((row, rowIndex) => (
                        <Grid key={rowIndex}>
                            <BoardTile key={rowIndex}
                                       tile={tiles.find(t => t.id === rowIndex + "" + colIndex)}
                                       ships={ships}
                                       onShips={onShips}
                            />
                        </Grid>
                    ))}
                </Grid>
            ))}
        </Grid>
    )
}

function BoardTile({tile, ships, onShips}) {
    const {setNodeRef} = useDroppable({
        id: tile.id,
        data: {
            row: tile.row,
            col: tile.col
        },
        disabled: tile.used
    })
    return (
        <span className="board-tile" ref={setNodeRef}>
            <img className="tile-img" src="/src/assets/framed-water.jpg" alt="board-tile"/>
            {tile.ship && <Ship
                id={tile.ship.id}
                key={tile.ship.id}
                isHorizontal={tile.ship.isHorizontal}
                length={tile.ship.length}
                row={tile.row}
                col={tile.col}
                ships={ships}
                onShips={onShips}
            />}
        </span>
    )
}

function Ship({id, isHorizontal, length, row, col, ships, onShips}) {
    const {
        active, attributes, listeners, setNodeRef, transform
    } = useDraggable({
        id: id,
        data: {length: length, isHorizontal: isHorizontal, row: row, col: col}
    })
    const zIndex = active && active.id === id ? 2 : 1;

    let srcString = "";
    let shipImageStyle = "";
    if (isHorizontal) {
        switch (length) {
            case 2 :
                srcString = "src/assets/ship_4.png"
                shipImageStyle = "img-ship-4"
                break
            case 3 :
                srcString = "src/assets/ship_3.png"
                shipImageStyle = "img-ship-3"
                break
            case 4 :
                srcString = "src/assets/ship_2.png"
                shipImageStyle = "img-ship-2"
                break
            case 5 :
                srcString = "src/assets/ship_1.png"
                shipImageStyle = "img-ship-1"
                break
        }
    } else {
        switch (length) {
            case 2 :
                srcString = "src/assets/ship_4_vert.png"
                shipImageStyle = "img-ship-4-vert"
                break
            case 3 :
                srcString = "src/assets/ship_3_vert.png"
                shipImageStyle = "img-ship-3-vert"
                break
            case 4 :
                srcString = "src/assets/ship_2_vert.png"
                shipImageStyle = "img-ship-2-vert"
                break
            case 5 :
                srcString = "src/assets/ship_1_vert.png"
                shipImageStyle = "img-ship-1-vert"
                break
        }
    }
    const buttonStyle = {
        position: "absolute",
        fontSize: 20,
        maxWidth: '20px',
        maxHeight: '20px',
        minWidth: '20px',
        minHeight: '20px'
    }
    // TODO: when hovering on the button: highlight the tiles that will be rotated too and if possible.
    const handleButtonClick = () => {
        onShips(ships.map((e) => {
            return e.id === id ? {...e, isHorizontal: isHorizontal = !isHorizontal} : e
        }))
    }
    return (
        <div
            ref={setNodeRef}
            style={{
                transform: CSS.Translate.toString(transform),
                zIndex
            }}
            {...attributes}
            {...listeners}
        >
            <Button onMouseDown={handleButtonClick} style={buttonStyle}>{isHorizontal ? "⬇️" : "➡️"}</Button>
            <img className={[shipImageStyle, "ship-image"].join(' ')} src={srcString} alt={"Ship"}/>
        </div>
    )
}

export default App

