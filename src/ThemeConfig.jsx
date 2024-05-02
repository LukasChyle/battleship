import {createTheme} from "@mui/material";

const ThemeConfig = (isDarkMode) => {
    return createTheme(isDarkMode ?
        {
            palette: {
                mode: "dark",
                boardSideRow: "rgba(255, 255, 255, 0.08)",
                customText: {
                    green: "lightgreen",
                    blue: "lightblue"
                },
                connection: {
                    connecting: "yellow",
                    connected: "green",
                    closing: "yellow",
                    disconnected: "darkred",
                    error: "gray",
                    border: "darkgray"
                }
            }
        } : {
            palette: {
                mode: "light",
                boardSideRow: "lavender",
                customText: {
                    green: "darkgreen",
                    blue: "darkblue"
                },
                connection: {
                    connecting: "yellow",
                    connected: "lime",
                    closing: "yellow",
                    disconnected: "red",
                    error: "lightgray",
                    border: "black"
                }
            }
        }
    )
}

export default ThemeConfig