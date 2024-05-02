import {createTheme} from "@mui/material";

const ThemeConfig = (isDarkMode) => {
    return createTheme(isDarkMode ?
        {
            palette: {
                mode: "dark",
                boardSideRow: "rgba(255, 255, 255, 0.08)",
                leaveButton: "crimson",
                customText: {
                    green: "lightgreen",
                    blue: "lightblue"
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
                boardSideRow: "lavender",
                leaveButton: "error",
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
                    border: "black",
                    title: "black",
                    text: "black"
                }
            }
        }
    )
}

export default ThemeConfig