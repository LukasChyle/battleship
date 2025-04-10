import {Grid, useTheme} from "@mui/material";
import OwnGameBoardTile from "./components/OwnGameBoardTile.jsx";
import {useEffect, useState} from "react";
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

export default function OwnGameBoard({ships, tileStrikes}) {
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
                                    {tileStrikes.find(t => t.row + "" + t.column === rowIndex + "" + columnIndex) &&
                                        <img className="tile-strike-img"
                                             src={getStrikeImage(
                                                 tiles.find(t => t.used && t.id === rowIndex + "" + columnIndex))}
                                             alt={"tileStrike"}
                                        />
                                    }
                                    <OwnGameBoardTile key={rowIndex}
                                                      tile={tiles.find(t => t.id === rowIndex + "" + columnIndex)}
                                                      tileStrikes={tileStrikes}
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