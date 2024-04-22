import {useState} from "react";
import {useDraggable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";
import {Button} from "@mui/material";

export default function SetUpShip({id, isHorizontal, length, row, col, ships, onShips, canBeLaid, markTiles, resetTileImages}) {
    const [isDisabled, setIsDisabled] = useState(false)
    const {
        active, attributes, listeners, setNodeRef, transform
    } = useDraggable({
        id: id,
        data: {length: length, isHorizontal: isHorizontal, row: row, col: col},
        disabled: isDisabled
    })
    const zIndex = active && active.id === id ? 2 : 1;

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
    const buttonStyle = {
        position: "absolute",
        fontSize: 20,
        maxWidth: '20px',
        maxHeight: '20px',
        minWidth: '20px',
        minHeight: '20px'
    }
    const handleButtonClick = () => {
        if (canBeLaid(length, !isHorizontal, isHorizontal, row, col, row, col)) {
            onShips(ships.map((e) => {
                return e.id === id ? {...e, isHorizontal: isHorizontal = !isHorizontal} : e
            }))
            resetTileImages()
        }
    }
    const handleButtonEnter = () => {
        markTiles(canBeLaid(length, !isHorizontal, isHorizontal, row, col, row, col), length, !isHorizontal, row, col)
        setIsDisabled(true)
    }
    const handleButtonLeave = () => {
        resetTileImages()
        setIsDisabled(false)
    }
    return (
        <div
            ref={setNodeRef}
            style={{
                transform: CSS.Translate.toString(transform),
                zIndex,
            }}
            {...attributes}
            {...listeners}
        >
            <Button onMouseEnter={handleButtonEnter}
                    onMouseLeave={handleButtonLeave}
                    onMouseDown={handleButtonClick}
                    style={buttonStyle}>{isHorizontal ? "⬇️" : "➡️"}
            </Button>
            <img className={[shipImageStyle, "ship-image"].join(' ')} src={srcString} alt={"Ship"}/>
        </div>
    )
}