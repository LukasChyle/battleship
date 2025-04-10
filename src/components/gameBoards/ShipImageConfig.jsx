const ShipImageConfig = (isHorizontal, length, isSunk) =>{
    let srcString = "";
    let shipImageStyle = "";

    if (isHorizontal) {
        switch (length) {
            case 2 :
                if (isSunk === true) {
                    srcString = "src/assets/ship_4.png"
                    shipImageStyle = "img-ship-4-sunk"
                    break
                }
                srcString = "src/assets/ship_4.png"
                shipImageStyle = "img-ship-4"
                break
            case 3 :
                if (isSunk === true) {
                    srcString = "src/assets/ship_3.png"
                    shipImageStyle = "img-ship-3-sunk"
                    break
                }
                srcString = "src/assets/ship_3.png"
                shipImageStyle = "img-ship-3"
                break
            case 4 :
                if (isSunk === true) {
                    srcString = "src/assets/ship_2.png"
                    shipImageStyle = "img-ship-2-sunk"
                    break
                }
                srcString = "src/assets/ship_2.png"
                shipImageStyle = "img-ship-2"
                break
            case 5 :
                if (isSunk === true) {
                    srcString = "src/assets/ship_1.png"
                    shipImageStyle = "img-ship-1-sunk"
                    break
                }
                srcString = "src/assets/ship_1.png"
                shipImageStyle = "img-ship-1"
                break
        }
    } else {
        switch (length) {
            case 2 :
                if (isSunk === true) {
                    srcString = "src/assets/ship_4.png"
                    shipImageStyle = "img-ship-4-vert-sunk"
                    break
                }
                srcString = "src/assets/ship_4.png"
                shipImageStyle = "img-ship-4-vert"
                break
            case 3 :
                if (isSunk === true) {
                    srcString = "src/assets/ship_3.png"
                    shipImageStyle = "img-ship-3-vert-sunk"
                    break
                }
                srcString = "src/assets/ship_3.png"
                shipImageStyle = "img-ship-3-vert"
                break
            case 4 :
                if (isSunk === true) {
                    srcString = "src/assets/ship_2.png"
                    shipImageStyle = "img-ship-2-vert-sunk"
                    break
                }
                srcString = "src/assets/ship_2.png"
                shipImageStyle = "img-ship-2-vert"
                break
            case 5 :
                if (isSunk === true) {
                    srcString = "src/assets/ship_1.png"
                    shipImageStyle = "img-ship-1-vert-sunk"
                    break
                }
                srcString = "src/assets/ship_1.png"
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