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
            id: (rowIndex + "" + columnIndex),
            used: false,
            ship: undefined
        })
    })))
    return tiles
}

function OwnGameBoard({ships, tileStrikes}) {
    const theme = useTheme()
    const [tiles, setTiles] = useState(getInitialTiles())

    useEffect(() => {
        MatchTilesWithShips(tiles, setTiles, ships)
    }, [tileStrikes]);

    const getStrikeImage = (isHit) => {
        if (isHit) {
            return "src/assets/strike-1.png"
        }
        return "src/assets/missed-strike.png"
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
                                    {tileStrikes.find(t => t.coordinate.row + "" + t.coordinate.column === rowIndex + ""
                                            + columnIndex) &&
                                        <img className="tile-strike-img"
                                             src={getStrikeImage(
                                                 tiles.find(t => t.used && t.id === rowIndex + "" + columnIndex))}
                                             alt={"tileStrike"}
                                        />
                                    }
                                    <GameBoardTile key={rowIndex}
                                                   tile={tiles.find(t => t.id === rowIndex + "" + columnIndex)}
                                                   tileStrikes={tileStrikes}
                                                   isOpponentTile={false}
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

export default React.memo(OwnGameBoard)