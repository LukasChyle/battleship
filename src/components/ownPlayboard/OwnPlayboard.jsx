import {Grid} from "@mui/material";
import OwnPlayboardTile from "./ownPlayboardComponents/OwnPlayboardTile.jsx";

const board = Array.apply(null, Array(10)).map(() => (
    Array.apply(null, Array(10)).map(function () {
    })))

export default function OwnPlayboard({ships, tileStrikes}) {

    const getTiles = () => {
        const tiles = []
        board.forEach((row, rowIndex) => (row.forEach((col, colIndex) => {
            const match = ships.find(t => t.row === rowIndex && t.col === colIndex)
            console.log(match)
            tiles.push({
                id: (rowIndex + "" + colIndex),
                src: "/src/assets/framed-water.jpg",
                ship: match? match : undefined
            })
        })))
        return tiles
    }
    const tiles = getTiles()

    return (
        <div>
            <Grid container>
                {board.map((col, colIndex) => (
                    <Grid className="board-row" key={colIndex}>
                        {col.map((row, rowIndex) => (
                            <Grid key={rowIndex}>
                                {tileStrikes.find(t => t === rowIndex + "" + colIndex) &&
                                    <img className="own-tile-strike-img"
                                         src={"src/assets/strike-1.png"} alt={"tileStrike"}
                                    />
                                }
                                <OwnPlayboardTile key={rowIndex}
                                                  tile={tiles.find(t => t.id === rowIndex + "" + colIndex)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}