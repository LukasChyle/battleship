import {Divider, Grid, Typography, useTheme} from "@mui/material";

export default function LetterRow() {
    const theme = useTheme()
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

    return (
        <Grid item xs={12} md={12}>
            {letters.map((letter) => (
                <div key={letter} className="letter-tile">
                    <Typography key={letter} style={{
                        alignContent: "center",
                        textAlign: "center",
                        color: theme.palette.boardSideRowText
                    }} className="letter-tile">{letter}</Typography>
                    <Divider/>
                </div>
            ))}
        </Grid>
    )
}