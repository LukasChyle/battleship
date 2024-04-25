import {Grid} from "@mui/material";
import OwnGameBoardTile from "./components/OwnGameBoardTile.jsx";
import {useEffect, useState} from "react";
import MatchTilesWithShips from "../MatchTilesWithShips.jsx";

const board = Array.apply(null, Array(10)).map(() => (
    Array.apply(null, Array(10)).map(function () {
    })))

const getInitialTiles = () => {
    const tiles = []
    board.forEach((row, rowIndex) => (row.forEach((col, colIndex) => {
        tiles.push({
            id: (rowIndex + "" + colIndex),
            used: false,
            ship: undefined
        })
    })))
    return tiles
}

export default function OwnGameBoard({ships, tileStrikes}) {
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
            <Grid container wrap="nowrap">
                {board.map((col, colIndex) => (
                    <Grid className="board-row" key={colIndex}>
                        {col.map((row, rowIndex) => (
                            <Grid key={rowIndex}>
                                {tileStrikes.find(t => t === rowIndex + "" + colIndex) &&
                                    <img className="tile-strike-img"
                                         src={getStrikeImage(tiles.find(t => t.used && t.id === rowIndex + "" + colIndex))} alt={"tileStrike"}
                                    />
                                }
                                <OwnGameBoardTile key={rowIndex}
                                                  tile={tiles.find(t => t.id === rowIndex + "" + colIndex)}
                                                  tileStrikes={tileStrikes}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}