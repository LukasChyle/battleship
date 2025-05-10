import {List, ListItem} from "@mui/material";
import SetUpShip from "./SetUpShip.jsx";

export default function InitialShipList({ships, setShips}) {
    return (
            <List sx={{width: "230px"}}>
                {ships.map((ship, index) =>
                    ship.row === undefined && ship.column === undefined &&
                    <ListItem key={index} sx={{paddingLeft: 0, paddingRight: 0}}>
                        <SetUpShip
                            id={ship.id}
                            key={ship.id}
                            isHorizontal={ship.isHorizontal}
                            length={ship.length}
                            row={ship.row}
                            column={ship.column}
                            ships={ships}
                            setShips={setShips}
                        />
                    </ListItem>
                )}
            </List>
    )
}