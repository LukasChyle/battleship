import {Grid, useTheme} from "@mui/material";
import OpponentGameBoardTile from "./components/OpponentGameBoardTile.jsx";
import {useEffect, useState} from "react";
import NumberRow from "../NumberRow.jsx";
import LetterRow from "../LetterRow.jsx";

const board = Array.apply(null, Array(10)).map(() => (
    Array.apply(null, Array(10)).map(function () {
    })))

const getTiles = () => {
    const tiles = []
    board.forEach((row, rowIndex) => (row.forEach((col, colIndex) => {
        tiles.push({
            id: (rowIndex + "" + colIndex),
            row: rowIndex,
            col: colIndex,
            alreadyUsed: false
        })
    })))
    return tiles
}

export default function OpponentGameBoard({tileStrikes, handleStrike}) {
    const theme = useTheme()
    const [tiles, setTiles] = useState(getTiles())

    const handleTiles = () => {
        setTiles(tiles.map((e) => {
            return {...e, alreadyUsed: !!tileStrikes.find(t => t.tileId === e.id)}
        }))
    }

    useEffect(() => {
        handleTiles()
    }, [tileStrikes]);

    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

    return (
        <div>
            <NumberRow/>
            <Grid container style={{backgroundColor: theme.palette.boardSideRow}} wrap="nowrap">
                <LetterRow/>
                <Grid container wrap="nowrap">
                    {board.map((col, colIndex) => (
                        <Grid className="board-row" key={colIndex}>
                            {col.map((row, rowIndex) => (
                                <Grid key={rowIndex}>
                                    {tileStrikes.find(t => t.tileId === rowIndex + "" + colIndex) &&
                                        <img className="tile-strike-img"
                                             src={tileStrikes.find(t => t.tileId === rowIndex + "" + colIndex).hit
                                                 ? "src/assets/strike-1.png" : "src/assets/missed-strike.png"}
                                             alt={"tileStrike"}
                                        />
                                    }
                                    <OpponentGameBoardTile key={rowIndex}
                                                           tile={tiles.find(t => t.id === rowIndex + "" + colIndex)}
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