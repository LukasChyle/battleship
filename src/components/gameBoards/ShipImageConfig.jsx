const ShipImageConfig = (isHorizontal, length) =>{
    let srcString = "";
    let shipImageStyle = "";

    if (isHorizontal) {
        switch (length) {
            case 2 :
                srcString = "src/assets/ship_4.png"
                shipImageStyle = "img-ship-4"
                break
            case 3 :
                srcString = "src/assets/ship_3.png"
                shipImageStyle = "img-ship-3"
                break
            case 4 :
                srcString = "src/assets/ship_2.png"
                shipImageStyle = "img-ship-2"
                break
            case 5 :
                srcString = "src/assets/ship_1.png"
                shipImageStyle = "img-ship-1"
                break
        }
    } else {
        switch (length) {
            case 2 :
                srcString = "src/assets/ship_4.png"
                shipImageStyle = "img-ship-4-vert"
                break
            case 3 :
                srcString = "src/assets/ship_3.png"
                shipImageStyle = "img-ship-3-vert"
                break
            case 4 :
                srcString = "src/assets/ship_2.png"
                shipImageStyle = "img-ship-2-vert"
                break
            case 5 :
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