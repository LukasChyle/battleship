import Game from "./components/game/Game.jsx";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {useState} from "react";
import ThemeConfig from "./ThemeConfig.jsx";
import Header from "./components/header/Header.jsx";

function App() {
    const [isDarkMode, setIsDarkMode] = useState(JSON.parse(window.sessionStorage?.getItem("isDarkMode")))
    const theme = ThemeConfig(isDarkMode)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header onIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}/>
            <Game/>
        </ThemeProvider>

    )
}

export default App

