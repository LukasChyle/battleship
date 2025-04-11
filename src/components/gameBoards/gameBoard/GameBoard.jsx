import {Grid, useTheme} from "@mui/material";
import React, {useEffect, useState} from "react";
import GameBoardTile from "./components/GameBoardTile.jsx";
import MatchTilesWithShips from "../MatchTilesWithShips.jsx";
import LetterRow from "../LetterRow.jsx";
import NumberRow from "../NumberRow.jsx";

const board = Array.apply(null, Array(10)).map(() => (
    Array.apply(null, Array(10)).map(function () {
    })))

const getInitialTiles = () => {
    const tiles = []
    board.forEach((row, rowIndex) => (row.forEach((column, columnIndex) => {
        tiles.push({
            row: rowIndex,
            column: columnIndex,
            usedByShip: false,
            ship: undefined,
            alreadyStruck: false
        })
    })))
    return tiles
}

function GameBoard({ships, tileStrikes, handleStrike, isOwnBoard}) {
    const theme = useTheme()
    const [tiles, setTiles] = useState(getInitialTiles())

    useEffect(() => {
        setTiles(matchTilesAlreadyUsed(ships ? MatchTilesWithShips(tiles, ships) : tiles))
    }, [tileStrikes]);

    const matchTilesAlreadyUsed = (tiles) => {
        return tiles.map((e) => {
            return {...e, alreadyStruck: !!tileStrikes.find(t => t.coordinate.row === e.row && t.coordinate.column === e.column)}
        })
    }

    const getStrikeImage = (rowIndex, columnIndex) => {
        return tileStrikes.find(
            t => t.coordinate.row === rowIndex && t.coordinate.column === columnIndex).hit
            ? "src/assets/strike-1.png" : "src/assets/missed-strike.png"
    }

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
                                    {tileStrikes.find(t => t.coordinate.row === rowIndex && t.coordinate.column === columnIndex) &&
                                        <img className="tile-strike-img"
                                             src={getStrikeImage(rowIndex, columnIndex)}
                                             alt={"tileStrike"}
                                        />
                                    }
                                    <GameBoardTile key={rowIndex}
                                                   tile={tiles.find(t => t.row === rowIndex && t.column === columnIndex)}
                                                   tileStrikes={tileStrikes}
                                                   isOwnTile={isOwnBoard}
                                                   handleStrike={handleStrike}
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

export default React.memo(GameBoard)