import {Grid, Typography} from "@mui/material";

export default function PlayerScore({strikes}) {

    const hits = strikes?.filter(e => e.hit === true).length

    return (
        <Grid container>
            <Grid item xs={12} md={3}>
                <Typography variant="h6">
                    {`${hits} hits`}
                </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography variant="h6">
                    {`${strikes.length - hits} misses`}
                </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
                <Typography variant="h6">
                    {`${strikes.length !== 0 ? (Math.trunc((hits/strikes.length) * 100) + "% hit rate") : ""}`}
                </Typography>
            </Grid>
        </Grid>
    )
}