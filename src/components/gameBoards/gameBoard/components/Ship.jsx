import ShipImageConfig from "../../ShipImageConfig.jsx";

export default function Ship({isHorizontal, length, isSunk}) {
    const shipImage = ShipImageConfig(isHorizontal, length, isSunk)

    return (
        <div
            style={{
                zIndex: 1,
            }}
        >
            <img className={[shipImage.shipImageStyle, "ship-image"].join(' ')} src={shipImage.srcString} alt={"Ship"}/>
        </div>
    )
}