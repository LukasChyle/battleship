import Ship from "./Ship.jsx";

export default function OwnGameBoardTile({tile, tileStrikes}) {
    const getUsedTileImage = (isHit) => {
        if (isHit) {
            return "/src/assets/red-framed-water.jpg"
        }
        return "/src/assets/green-framed-water.jpg"
    }

    return (
        <span className="board-tile">
            <img className="tile-img" src={tile.used? getUsedTileImage(tileStrikes.find(t => t.tileId === tile.id)) : "/src/assets/framed-water.jpg"} alt="board-tile"/>
            {tile.ship && <Ship
                key={tile.ship.id}
                isHorizontal={tile.ship.isHorizontal}
                length={tile.ship.length}
            />}
        </span>
    )
}