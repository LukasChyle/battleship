
import OwnPlayboard from "../playboards/ownPlayboard/OwnPlayboard.jsx";
import OpponentPlayboard from "../playboards/opponentPlayboard/OpponentPlayboard.jsx";

export default function GameSession({ships, ownStrikes, opponentStrikes, handleTileStrikeClick}) {




    return (
        <div>
            {/*<Grid container>*/}
            {/*    <Grid children>*/}
            {/*    </Grid>*/}
            {/*    <Grid children>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
            <OwnPlayboard ships={ships} tileStrikes={opponentStrikes}/>
            <p> . </p>
            <OpponentPlayboard onTileClick={handleTileStrikeClick} tileStrikes={ownStrikes}/>
        </div>
    )
}