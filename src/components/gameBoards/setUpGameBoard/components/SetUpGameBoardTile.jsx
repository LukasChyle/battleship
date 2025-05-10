import {useDroppable} from "@dnd-kit/core";
import SetUpShip from "./SetUpShip.jsx";

export default function SetUpGameBoardTile({tile, ships, setShips, canBeLaid, markTiles, resetTileImages}) {
    const {setNodeRef} = useDroppable({
        id: tile.id,
        data: {
            row: tile.row,
            column: tile.column
        }
    })
    return (
        <span className="board-tile" ref={setNodeRef}>
            <img className="tile-img" src={tile.src} alt="board-tile"/>
            {tile.ship && <SetUpShip
                id={tile.ship.id}
                key={tile.ship.id}
                isHorizontal={tile.ship.isHorizontal}
                length={tile.ship.length}
                row={tile.row}
                column={tile.column}
                ships={ships}
                setShips={setShips}
                canBeLaid={canBeLaid}
                markTiles={markTiles}
                resetTileImages={resetTileImages}
            />}
        </span>
    )
}