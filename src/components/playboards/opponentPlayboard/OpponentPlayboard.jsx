import {Grid} from "@mui/material";
import OpponentPlayboardTile from "./opponentPlayboardComponents/OpponentPlayboardTile.jsx";
import {useEffect, useState} from "react";

const board = Array.apply(null, Array(10)).map(() => (
    Array.apply(null, Array(10)).map(function () {
    })))

const getTiles = () => {
    const tiles = []
    board.forEach((row, rowIndex) => (row.forEach((col, colIndex) => {
        tiles.push({
            id: (rowIndex + "" + colIndex),
            alreadyUsed: false
        })
    })))
    return tiles
}

export default function OpponentPlayboard({tileStrikes, onTileClick}) {
    const [tiles, setTiles] = useState(getTiles())

    const handleTiles = () => {
        setTiles(tiles.map((e) => {
            return {...e, alreadyUsed: !!tileStrikes.find(t => t.id === e.id)}
        }))
    }

    useEffect(() => {
        handleTiles()
    }, [tileStrikes]);

    return (
        <div>
            <Grid container>
                {board.map((col, colIndex) => (
                    <Grid className="board-row" key={colIndex}>
                        {col.map((row, rowIndex) => (
                            <Grid key={rowIndex}>
                                {tileStrikes.find(t => t.id === rowIndex + "" + colIndex) && // TODO:
                                    <img className="tile-strike-img"
                                         src={tileStrikes.find(t => t.id === rowIndex + "" + colIndex).isHit
                                             ? "src/assets/strike-1.png" : "src/assets/missed-strike.png"}
                                         alt={"tileStrike"}
                                    />
                                }
                                <OpponentPlayboardTile key={rowIndex}
                                                       tile={tiles.find(t => t.id === rowIndex + "" + colIndex)}
                                                       onTileClick={onTileClick}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}