export default function MatchTilesWithShips(tiles, onTiles, ships) {
    const tilesToChange = []
    ships.forEach((e) => {
        for (let i = 0; i < e.length; i++) {
            if (e.isHorizontal) {
                tilesToChange.push({id: (e.row + "" + (e.column + i)), ship: e.column === (e.column + i) ? e : undefined})
            } else {
                tilesToChange.push({id: ((e.row + i) + "" + e.column), ship: e.row === (e.row + i) ? e : undefined})
            }
        }
    })
    onTiles(tiles.map((e) => {
        const match = tilesToChange.find(t => t.id === e.id)
        return match ? {...e, used: true, ship: match.ship} : {...e, used: false, ship: undefined}
    }))
}