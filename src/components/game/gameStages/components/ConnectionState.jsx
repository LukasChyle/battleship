import {Box, Typography} from "@mui/material";

export default function ConnectionState({style, state}) {

    const getConnectionState = () => {
        if (state === 0) {
            return {string: "Connecting", color: "yellow"}
        } else if (state === 1) {
            return {string: "Connected", color: "lime"}
        } else if (state === 2) {
            return {string: "Closing", color: "yellow"}
        } else if (state === 3) {
            return {string: "Disconnected", color: "red"}
        } else {
            return {string: "Error", color: "lightgray"}
        }
    }
    const values = getConnectionState()

    return (
        <div style={style}>
        <Typography variant="caption" sx={{fontWeight: "bold"}}>{"Connection state"}</Typography>
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={30}
            width={100}
            sx={{
                borderRadius: '5px',
                border: "2px solid black",
                backgroundColor: values.color,
                fontWeight: "bold"
            }}
        >
            <Typography variant="caption" sx={{fontWeight: "bold"}}>{values.string}</Typography>
        </Box>
        </div>
    )
}