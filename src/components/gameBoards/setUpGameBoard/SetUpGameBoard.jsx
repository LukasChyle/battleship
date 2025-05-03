import {Grid, Paper, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import {DndContext} from "@dnd-kit/core";
import SetUpGameBoardTile from "./components/SetUpGameBoardTile.jsx";
import MatchTilesWithShips from "../MatchTilesWithShips.jsx";
import NumberRow from "../NumberRow.jsx";
import LetterRow from "../LetterRow.jsx";
import InitialShipList from "./components/InitialShipList.jsx";

const board = Array.apply(null, Array(10)).map(() => (
    Array.apply(null, Array(10)).map(function () {
    })))

const getInitialTiles = () => {
    const tiles = []
    board.forEach((row, rowIndex) => (row.forEach((column, columnIndex) => {
        tiles.push({
            id: (rowIndex + "" + columnIndex),
            row: rowIndex,
            column: columnIndex,
            src: "/battleship/src/assets/framed-water.jpg",
            usedByShip: false,
            ship: undefined
        })
    })))
    return tiles
}

export default function SetUpGameBoard({ships, onShips}) {
    const theme = useTheme()
    const [tiles, setTiles] = useState(getInitialTiles())

    useEffect(() => {
        setTiles(MatchTilesWithShips(tiles, ships))
    }, [ships]);

    const handleDragOver = (e) => {
        if (e.over) {
            markTiles(canBeLaid(
                    e.active.data.current.length,
                    e.active.data.current.isHorizontal,
                    e.active.data.current.isHorizontal,
                    e.over.data.current.row,
                    e.over.data.current.column,
                    e.active.data.current.row,
                    e.active.data.current.column),
                e.active.data.current.length,
                e.active.data.current.isHorizontal,
                e.over.data.current.row,
                e.over.data.current.column)
        }
    }

    const handleDragEnd = (e) => {
        resetTileImages()
        if (!e.over) {
            return
        }
        if (!canBeLaid(
            e.active.data.current.length,
            e.active.data.current.isHorizontal,
            e.active.data.current.isHorizontal,
            e.over.data.current.row,
            e.over.data.current.column,
            e.active.data.current.row,
            e.active.data.current.column)) {
            return
        }
        onShips(ships.map((ship) => {
            const match = e.active.id === ship.id
            return match ? {...ship, row: e.over.data.current.row, column: e.over.data.current.column} : ship
        }))
    }

    const canBeLaid = (length, layIsHorizontal, currentIsHorizontal, overRow, overColumn, currentRow,
        currentColumn) => {
        if (layIsHorizontal) {
            if (length + overColumn > 10) {
                return false
            }
        } else {
            if (length + overRow > 10) {
                return false
            }
        }
        const currentTiles = []
        if (currentRow !== undefined && currentColumn !== undefined) {
            for (let i = 0; i < length; i++) {
                currentIsHorizontal ? currentTiles.push({id: currentRow + "" + (currentColumn + i)})
                    : currentTiles.push(
                        {id: (currentRow + i) + "" + currentColumn})
            }
        }
        for (let i = 0; i < length; i++) {
            if (layIsHorizontal) {
                if (tiles.find(e => e.id === overRow + "" + (overColumn + i)).usedByShip && !currentTiles.find(
                    e => e.id === overRow + "" + (overColumn + i))) {
                    return false
                }
            } else {
                if (tiles.find(e => e.id === (overRow + i) + "" + overColumn).usedByShip && !currentTiles.find(
                    e => e.id === (overRow + i) + "" + overColumn)) {
                    return false
                }
            }
        }
        return true
    }

    const markTiles = (canBeLaid, length, isHorizontal, overRow, overColumn) => {
        const tilesToChange = []
        for (let i = 0; i < length; i++) {
            isHorizontal ? tilesToChange.push({id: overRow + "" + (overColumn + i)}) : tilesToChange.push(
                {id: (overRow + i) + "" + overColumn})
        }
        setTiles(tiles.map((e) => {
            const match = tilesToChange.find(t => t.id === e.id)
            return match ? {
                ...e,
                src: canBeLaid ? "/battleship/src/assets/green-framed-water.jpg" : "/src/assets/red-framed-water.jpg"
            } : {...e, src: "/battleship/src/assets/framed-water.jpg"}
        }))
    }

    const resetTileImages = () => {
        setTiles(tiles.map((e) => {
            return {...e, src: "/battleship/src/assets/framed-water.jpg"}
        }))
    }

    return (
        <div>
            <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
                <div>
                    <Grid container display="flex">
                        <Grid item xs={12} md={5}>
                            <InitialShipList ships={ships} onShips={onShips}/>
                        </Grid>
                        <Grid container wrap="nowrap" item xs={12} md={7}>
                            <Paper elevation={7}>
                                <NumberRow/>
                                <Grid container style={{backgroundColor: theme.palette.boardSideRowBackground}}
                                      wrap="nowrap">
                                    <LetterRow/>
                                    <Grid container wrap="nowrap">
                                        {board.map((column, columnIndex) => (
                                            <Grid key={columnIndex}>
                                                {column.map((row, rowIndex) => (
                                                    <Grid key={rowIndex}>
                                                        <SetUpGameBoardTile key={rowIndex}
                                                                            tile={tiles.find(
                                                                                t => t.id === rowIndex + ""
                                                                                    + columnIndex)}
                                                                            ships={ships}
                                                                            onShips={onShips}
                                                                            canBeLaid={canBeLaid}
                                                                            markTiles={markTiles}
                                                                            resetTileImages={resetTileImages}
                                                        />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </DndContext>
        </div>
    )
}