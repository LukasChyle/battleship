import {Divider, Grid, Typography, useTheme} from "@mui/material";

export default function NumberRow() {
    const theme = useTheme()
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

    return (
        <Grid container wrap="nowrap" style={{
            alignContent: "baseline",
            justifyContent: "right",
            backgroundColor: theme.palette.boardSideRowBackground
        }}>
            {numbers.map((number) => (
                <div key={number} className="number-tile">
                    <Typography key={number} style={{
                        alignContent: "center",
                        textAlign: "center",
                        color: theme.palette.boardSideRowText
                    }} className="number-tile">{number}</Typography>
                    <Divider orientation="vertical" flexItem  style={{   alignSelf: "stretch",
                        height: "auto" }}/>
                </div>
            ))}
        </Grid>
    )
}