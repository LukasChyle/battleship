import {Button, Grid, Input} from "@mui/material";
import {messages} from "../../Game.messages.js";
import {useIntl} from "react-intl";

export default function StartMenu({handleStartGame, ships, joinGameCode, setJoinGameCode}) {
    const intl = useIntl()

    return (
        <div style={{marginTop: "30px"}}>
            <Grid container
                  spacing={2}
                  sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                  }}>
                <Grid item xs={12} md={12}>
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => handleStartGame(false, true)}
                        disabled={!!(ships.find(e => e.row === undefined) ||
                            ships.find(e => e.column === undefined))}
                    >
                        {intl.formatMessage(messages.startGameAgainstAiButton)}
                    </Button>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => handleStartGame(false, false)}
                        disabled={!!(ships.find(e => e.row === undefined) ||
                            ships.find(e => e.column === undefined))}
                    >
                        {intl.formatMessage(messages.startGameAgainstPlayerButton)}
                    </Button>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => handleStartGame(true, false)}
                        disabled={!!(ships.find(e => e.row === undefined) ||
                            ships.find(e => e.column === undefined))}
                    >
                        {intl.formatMessage(messages.startGameForFriendButton)}
                    </Button>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => handleStartGame(true, false)}
                        disabled={
                            !!(ships.find(e => e.row === undefined) ||
                                ships.find(e => e.column === undefined) || joinGameCode.length !== 36
                            )}
                    >
                        {intl.formatMessage(messages.joinFriendWithCodeButton)}
                    </Button>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Input
                        id="join-game-code-input"
                        fullWidth
                        placeholder={intl.formatMessage(messages.enterCodeToJoinInputPlaceholder)}
                        value={joinGameCode}
                        onChange={e => setJoinGameCode(e.target.value.trim())}
                    />
                </Grid>
            </Grid>
        </div>
    )
}