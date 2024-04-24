
import SetUpPlayboard from "../playboards/setUpPlayboard/SetUpPlayboard.jsx";

export default function GameSetUp({ships, onShips}) {

    return (
        <div>
            {/*<Grid container>*/}
            {/*    <Grid children>*/}
            {/*    </Grid>*/}
            {/*    <Grid children>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
            <SetUpPlayboard ships={ships} onShips={onShips}/>
        </div>
    )
}