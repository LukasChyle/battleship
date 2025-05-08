import {createTheme} from "@mui/material";

const ThemeConfig = (isDarkMode) => {
    return createTheme(isDarkMode ?
        {
            palette: {
                mode: "dark",
                primary: {
                    main: "#87cefa",
                },
                appBarText: "#87cefa",
                boardSideRowBackground: "rgba(255, 255, 255, 0.08)",
                boardSideRowText: "lightgreen",
                leaveButton: "crimson",
                customText: {
                    green: "#81c784",
                    blue: "#87cefa",
                    header: "white"
                },
                connection: {
                    connecting: "gold",
                    connected: "limegreen",
                    closing: "gold",
                    disconnected: "crimson",
                    error: "gray",
                    border: "darkgray",
                    title: "gray",
                    text: "black"
                }
            }
        } : {
            palette: {
                mode: "light",
                background: {
                    default: "rgba(0, 0, 0, 0.04)",
                },
                appBarText: "white",
                boardSideRowBackground: "lavender",
                boardSideRowText: "black",
                leaveButton: "error",
                customText: {
                    green: "#1b5e20",
                    blue: "#0d47a1",
                    header: "black"
                },
                connection: {
                    connecting: "yellow",
                    connected: "lime",
                    closing: "yellow",
                    disconnected: "red",
                    error: "lightgray",
                    border: "black",
                    title: "black",
                    text: "black"
                }
            }
        }
    )
}

export default ThemeConfig