import {Grid, useTheme} from "@mui/material";
import React, {useEffect, useState} from "react";
import GameBoardTile from "../ownGameBoard/components/GameBoardTile.jsx";
import NumberRow from "../NumberRow.jsx";
import LetterRow from "../LetterRow.jsx";

const board = Array.apply(null, Array(10)).map(() => (
    Array.apply(null, Array(10)).map(function () {
    })))

const getTiles = () => {
    const tiles = []
    board.forEach((row, rowIndex) => (row.forEach((column, columnIndex) => {
        tiles.push({
            id: (rowIndex + "" + columnIndex),
            row: rowIndex,
            column: columnIndex,
            alreadyUsed: false
        })
    })))
    return tiles
}

function OpponentGameBoard({tileStrikes, handleStrike}) {
    const theme = useTheme()
    const [tiles, setTiles] = useState(getTiles())

    const handleTiles = () => {
        setTiles(tiles.map((e) => {
            return {...e, alreadyUsed: !!tileStrikes.find(t => t.coordinate.row + "" + t.coordinate.column === e.id)}
        }))
    }

    useEffect(() => {
        handleTiles()
    }, [tileStrikes]);

    return (
        <div>
            <NumberRow/>
            <Grid container style={{backgroundColor: theme.palette.boardSideRowBackground}} wrap="nowrap">
                <LetterRow/>
                <Grid container wrap="nowrap">
                    {board.map((column, columnIndex) => (
                        <Grid className="board-row" key={columnIndex}>
                            {column.map((row, rowIndex) => (
                                <Grid key={rowIndex}>
                                    {tileStrikes.find(t => t.coordinate.row + "" + t.coordinate.column === rowIndex + ""
                                            + columnIndex) &&
                                        <img className="tile-strike-img"
                                             src={tileStrikes.find(
                                                 t => t.coordinate.row + "" + t.coordinate.column === rowIndex + ""
                                                     + columnIndex).hit
                                                 ? "src/assets/strike-1.png" : "src/assets/missed-strike.png"}
                                             alt={"tileStrike"}
                                        />
                                    }
                                    <GameBoardTile key={rowIndex}
                                                   tile={tiles.find(t => t.id === rowIndex + "" + columnIndex)}
                                                   handleStrike={handleStrike}
                                                   isOpponentTile={true}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </div>
    )
}

export default React.memo(OpponentGameBoard)