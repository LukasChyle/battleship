import {useState} from "react";

export default function OpponentGameBoardTile({tile, onTileClick}) {
    const [image, setImage] = useState("/src/assets/framed-water.jpg")
    const handleOnMouseEnter = () => {
        if (tile.alreadyUsed) {
            setImage("/src/assets/red-framed-water.jpg")
        } else {
            setImage("/src/assets/strike-framed-water.jpg")
        }
    }
    const handleOnMouseLeave = () => {
        setImage("/src/assets/framed-water.jpg")
    }
    return (
        <span className="board-tile">
            <img
                onClick={() => !tile.alreadyUsed? onTileClick(tile.id) : null}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                className="opponent-tile-img tile-img"
                src={image} alt="board-tile"/>
        </span>
    )
}