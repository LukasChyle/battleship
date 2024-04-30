import {Divider, Grid, Typography} from "@mui/material";
import OpponentGameBoardTile from "./components/OpponentGameBoardTile.jsx";
import {useEffect, useState} from "react";

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
            <Grid container wrap="nowrap" style={{
                alignContent: "baseline",
                justifyContent: "right",
                backgroundColor: "lavender"
            }}>
                {numbers.map((number) => (
                    <div key={number} className="number-tile">
                        <Typography key={number} style={{
                            alignContent: "center",
                            textAlign: "center",
                        }} className="number-tile">{number}</Typography>
                        <Divider orientation="vertical" flexItem style={{
                            alignSelf: "stretch",
                            height: "auto"
                        }}/>

                    </div>

                ))}
            </Grid>
            <Grid container style={{backgroundColor: "lavender"}} wrap="nowrap">
                <Grid item xs={12} md={12}>
                    {letters.map((letter) => (
                        <div key={letter} className="letter-tile">
                            <Typography key={letter} style={{
                                alignContent: "center",
                                textAlign: "center",
                            }} className="letter-tile">{letter}</Typography>
                            <Divider/>
                        </div>
                    ))}
                </Grid>
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