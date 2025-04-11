export default function MatchTilesWithShips(tiles, ships) {
    const tilesToChange = []
    ships.forEach((e) => {
        for (let i = 0; i < e.length; i++) {
            if (e.isHorizontal) {
                tilesToChange.push(
                    {row: e.row, column: e.column + i, usedBySunkenShip: e.isSunk, ship: e.column === (e.column + i) ? e : undefined})
            } else {
                tilesToChange.push({row: e.row + i, column: e.column, usedBySunkenShip: e.isSunk, ship: e.row === (e.row + i) ? e : undefined})
            }
        }
    })
    console.log(ships)
    return tiles.map((e) => {
        const match = tilesToChange.find(t => t.row === e.row && t.column === e.column)
        return match ? {...e, usedByShip: true, usedBySunkenShip: match.usedBySunkenShip, ship: match.ship}
            : {...e, usedByShip: false, ship: undefined}
    })
}

// usedBySunkenShip: match.ship.sunk