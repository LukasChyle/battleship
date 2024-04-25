import OwnGameBoard from "../../gameBoards/ownGameBoard/OwnGameBoard.jsx";
import OpponentGameBoard from "../../gameBoards/opponentGameBoard/OpponentGameBoard.jsx";
import {Grid, Paper, Typography} from "@mui/material";
import GameLogMessageList from "../../gameLogMessageList/GameLogMessageList.jsx";

export default function GameSession({ships, ownStrikes, opponentStrikes, handleTileStrikeClick, gameLogMessages}) {

    const ownBoardGridStyle = {
        display: "grid",
        alignContent: "center",
        justifyContent: "center",
        marginTop: "24px",
    }

    const opponentBoardGridStyle = {
        display: "grid",
        alignContent: "center",
        justifyContent: "left",
        marginTop: "24px"
    }

    const gameLogGridStyle = {
        alignContent: "center",
        justifyContent: "left",
        marginTop: "24px"
    }

    return (
        <div>
            <Grid container spacing={10}>
                <Grid item xs={12} md={1}/>
                <Grid item xs={12} md={4} style={ownBoardGridStyle}>
                    <Typography variant="h5" component="div">Your Board</Typography>
                    <Paper elevation={7}>
                        <OwnGameBoard ships={ships} tileStrikes={opponentStrikes}/>
                    </Paper>

                </Grid>
                <Grid item xs={12} md={4} style={opponentBoardGridStyle}>
                    <Typography variant="h5" component="div">Opponents Board</Typography>
                    <Paper elevation={7}>
                        <OpponentGameBoard onTileClick={handleTileStrikeClick} tileStrikes={ownStrikes}/>
                    </Paper>

                </Grid>
                <Grid item xs={12} md={2} style={gameLogGridStyle}>
                    <Typography variant="h5" component="div">Action log</Typography>
                    <GameLogMessageList messages={gameLogMessages}/>
                </Grid>
            </Grid>
        </div>
    )
}