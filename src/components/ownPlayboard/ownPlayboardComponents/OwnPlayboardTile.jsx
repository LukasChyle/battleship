import Ship from "./Ship.jsx";

export default function OwnPlayboardTile({tile}) {
    return (
        <span className="board-tile">
            <img className="tile-img" src={tile.src} alt="board-tile"/>
            {tile.ship && <Ship
                key={tile.ship.id}
                isHorizontal={tile.ship.isHorizontal}
                length={tile.ship.length}
            />}
        </span>
    )
}