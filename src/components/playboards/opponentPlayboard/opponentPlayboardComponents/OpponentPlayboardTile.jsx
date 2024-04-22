export default function OpponentPlayboardTile({tile, onTileClick}) {
    return (
        <span className="board-tile">
            <img onClick={!tile.alreadyUsed? onTileClick : null} className="tile-img" src={"/src/assets/framed-water.jpg"} alt="board-tile"/>
        </span>
    )
}