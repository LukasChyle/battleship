import {Grid, Typography} from "@mui/material";
import {useIntl} from "react-intl";
import {messages} from "../../Game.messages.js";

export default function PlayerScore({strikes}) {
    const intl = useIntl()

    const hits = strikes?.filter(e => e.hit === true).length

    return (
        <Grid container>
            <Grid item xs={12} md={3}>
                <Typography variant="h6">
                    {`${hits} ${intl.formatMessage(messages.playerScoreHits)}`}
                </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
                <Typography variant="h6">
                    {`${strikes.length - hits} ${intl.formatMessage(messages.playerScoreMisses)}`}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="h6">
                    {`${strikes.length !== 0 ?
                        (Math.trunc((hits / strikes.length) * 100) + "% " +
                            intl.formatMessage(messages.playerScoreHitRatio)) : ""}`}
                </Typography>
            </Grid>
        </Grid>
    )
}