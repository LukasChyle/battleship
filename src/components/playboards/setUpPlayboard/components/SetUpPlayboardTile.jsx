import {useDroppable} from "@dnd-kit/core";
import SetUpShip from "./SetUpShip.jsx";

export default function SetUpPlayboardTile({tile, ships, onShips, canBeLaid, markTiles, resetTileImages}) {
    const {setNodeRef} = useDroppable({
        id: tile.id,
        data: {
            row: tile.row,
            col: tile.col
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
                col={tile.col}
                ships={ships}
                onShips={onShips}
                canBeLaid={canBeLaid}
                markTiles={markTiles}
                resetTileImages={resetTileImages}
            />}
        </span>
    )
}