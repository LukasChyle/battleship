import SetUpGameBoard from "../../gameBoards/setUpGameBoard/SetUpGameBoard.jsx";
import {Button, Grid, ListItemText, Paper, useTheme} from "@mui/material";
import {useIntl} from "react-intl";
import {messages} from "../Game.messages.js";

export default function GameSetUp({ships, onShips, onIsPlayingGame}) {
    const theme = useTheme()
    const intl = useIntl()
    const handleStartGame = () => {
        onIsPlayingGame(true)
        window.sessionStorage.setItem("isPlayingGame", true)
        window.sessionStorage.removeItem("messages")
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} md={8} sx={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    marginTop: "50px"
                }}>
                    <SetUpGameBoard ships={ships} onShips={onShips}/>
                </Grid>
                <Grid item xs={12} md={3} sx={{
                    display: "grid",
                    alignContent: "center",
                    justifyContent: "center",
                }}>
                    <Paper elevation={3} sx={{padding: "24px"}}>
                        <ListItemText
                            primary={intl.formatMessage(messages.instructionsTitle) + ":"}
                            secondary={intl.formatMessage(messages.instructionsContent)}
                            primaryTypographyProps={{variant: "h6", fontWeight: "bold"}}
                            secondaryTypographyProps={{variant: "body1", color: theme.palette.text.primary}}
                        />
                        <div style={{marginTop: "30px"}}>
                            <Button
                                size="large"
                                variant="contained"
                                color="primary"
                                onClick={handleStartGame}
                                disabled={!!(ships.find(e => e.row === undefined) ||
                                    ships.find(e => e.column === undefined))}
                            >
                                {intl.formatMessage(messages.startGameButton)}
                            </Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}