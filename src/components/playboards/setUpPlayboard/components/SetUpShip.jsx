import {useState} from "react";
import {useDraggable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";
import {Button} from "@mui/material";
import ShipImageConfig from "../../ShipImageConfig.jsx";

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
    const shipImage = ShipImageConfig(isHorizontal, length)

    const buttonStyle = {
        position: "absolute",
        fontSize: 25,
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
            <img className={[shipImage.shipImageStyle, "ship-image"].join(' ')} src={shipImage.srcString} alt={"Ship"}/>
        </div>
    )
}