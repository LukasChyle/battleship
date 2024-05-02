import Game from "./components/game/Game.jsx";
import {AppBar, createTheme, CssBaseline, FormControlLabel, Switch, ThemeProvider} from "@mui/material";
import {useState} from "react";

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const theme = createTheme({
        palette: {
            mode: isDarkMode ? "dark" : "light",
            customText: {
                green: isDarkMode ? "lightgreen" : "darkgreen",
                blue: isDarkMode ? "lightblue" : "darkblue"
            },
            boardSideRow: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "lavender"
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isDarkMode}
                            color="primary"
                            onChange={() => setIsDarkMode(isDarkMode => !isDarkMode)}
                        />}
                    label="Dark"
                    labelPlacement="start"
                />
            </AppBar>
            <Game/>
        </ThemeProvider>

    )
}

export default App

