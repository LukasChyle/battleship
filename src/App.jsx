import Game from "./components/game/Game.jsx";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {useState} from "react";
import ThemeConfig from "./ThemeConfig.jsx";
import Header from "./components/header/Header.jsx";
import LanguageProvider from "./translation/LanguageProvider.jsx";

function App() {
    const [locale, setLocale] = useState(
        window.localStorage?.getItem("lang") ? window.localStorage.getItem("lang") : "en");
    const [isDarkMode, setIsDarkMode] = useState(JSON.parse(window.sessionStorage?.getItem("isDarkMode")))
    const theme = ThemeConfig(isDarkMode)


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <LanguageProvider locale={locale}>
                <Header onIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} locale={locale} onLocale={setLocale}/>
                <Game/>
            </LanguageProvider>
        </ThemeProvider>
    )
}

export default App

