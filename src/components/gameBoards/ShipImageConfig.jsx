const ShipImageConfig = (isHorizontal, length, isSunk) =>{
    let srcString = "";
    let shipImageStyle = "";

    if (isHorizontal) {
        switch (length) {
            case 2 :
                if (isSunk === true) {
                    srcString = "/battleship/src/assets/ship4.png"
                    shipImageStyle = "img-ship-4-sunk"
                    break
                }
                srcString = "/battleship/src/assets/ship4.png"
                shipImageStyle = "img-ship-4"
                break
            case 3 :
                if (isSunk === true) {
                    srcString = "/battleship/src/assets/ship3.png"
                    shipImageStyle = "img-ship-3-sunk"
                    break
                }
                srcString = "/battleship/src/assets/ship3.png"
                shipImageStyle = "img-ship-3"
                break
            case 4 :
                if (isSunk === true) {
                    srcString = "/battleship/src/assets/ship2.png"
                    shipImageStyle = "img-ship-2-sunk"
                    break
                }
                srcString = "/battleship/src/assets/ship2.png"
                shipImageStyle = "img-ship-2"
                break
            case 5 :
                if (isSunk === true) {
                    srcString = "/battleship/src/assets/ship1.png"
                    shipImageStyle = "img-ship-1-sunk"
                    break
                }
                srcString = "/battleship/src/assets/ship1.png"
                shipImageStyle = "img-ship-1"
                break
        }
    } else {
        switch (length) {
            case 2 :
                if (isSunk === true) {
                    srcString = "/battleship/src/assets/ship4.png"
                    shipImageStyle = "img-ship-4-vert-sunk"
                    break
                }
                srcString = "/battleship/src/assets/ship4.png"
                shipImageStyle = "img-ship-4-vert"
                break
            case 3 :
                if (isSunk === true) {
                    srcString = "/battleship/src/assets/ship3.png"
                    shipImageStyle = "img-ship-3-vert-sunk"
                    break
                }
                srcString = "/battleship/src/assets/ship3.png"
                shipImageStyle = "img-ship-3-vert"
                break
            case 4 :
                if (isSunk === true) {
                    srcString = "/battleship/src/assets/ship2.png"
                    shipImageStyle = "img-ship-2-vert-sunk"
                    break
                }
                srcString = "/battleship/src/assets/ship2.png"
                shipImageStyle = "img-ship-2-vert"
                break
            case 5 :
                if (isSunk === true) {
                    srcString = "/battleship/src/assets/ship1.png"
                    shipImageStyle = "img-ship-1-vert-sunk"
                    break
                }
                srcString = "/battleship/src/assets/ship1.png"
                shipImageStyle = "img-ship-1-vert"
                break
        }
    }

    return (
        {
            srcString: srcString,
            shipImageStyle: shipImageStyle,
        }
    )
}

export default ShipImageConfig