import {useState} from "react";
import Ship from "./Ship.jsx";

const getInitialTileImage = (tile, tileStrikes) => {
    return tile.used ? getUsedTileImage(
            tileStrikes.find(t => t.coordinate.row + "" + t.coordinate.column === tile.id))
        : "/src/assets/framed-water.jpg"
}

const getUsedTileImage = (isHit) => {
    if (isHit) {
        return "/src/assets/red-framed-water.jpg"
    }
    return "/src/assets/green-framed-water.jpg"
}

export default function OpponentGameBoardTile({tile, tileStrikes, handleStrike, isOpponentTile}) {
    const [image, setImage] = useState(getInitialTileImage(tile, tileStrikes))

    const handleClick = () => {
        if (!isOpponentTile || tile.alreadyUsed) {
            return
        }
        handleStrike({ row: tile.row, column: tile.column })
    }

    const handleOnMouseEnter = () => {
        if (!isOpponentTile) {
            return
        }
        setImage("/src/assets/strike-framed-water.jpg")
    }

    const handleOnMouseLeave = () => {
        if (!isOpponentTile) {
            return
        }
        setImage(getInitialTileImage(tile, tileStrikes))
    }

    return (
        <span className="board-tile">
            <img
                onClick={handleClick}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                className="opponent-tile-img tile-img"
                src={image}
                alt="board-tile"/>
            {tile.ship && <Ship
                key={tile.ship.id}
                isHorizontal={tile.ship.isHorizontal}
                length={tile.ship.length}
                isSunk={tile.ship.isSunk}
            />}
        </span>
    )
}