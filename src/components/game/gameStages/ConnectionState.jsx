import {Box, Typography} from "@mui/material";

export default function ConnectionState({state}) {

    const getConnectionState = () => {
        if (state === 0) {
            return {string: "Connecting", color: "khaki"}
        } else if (state === 1) {
            return {string: "Connected", color: "lightgreen"}
        } else if (state === 2) {
            return {string: "Closing", color: "khaki "}
        } else if (state === 3) {
            return {string: "Disconnected", color: "lightcoral"}
        } else {
            return {string: "Error", color: "lightgray"}
        }
    }
    const values = getConnectionState()

    return (
        <div>
        <Typography variant="caption" sx={{fontWeight: "bold"}}>{"Connection state"}</Typography>
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={30}
            width={100}
            sx={{
                border: "2px solid gray",
                backgroundColor: values.color,
                fontWeight: "bold"
            }}
        >
            <Typography variant="caption" sx={{fontWeight: "bold"}}>{values.string}</Typography>
        </Box>
        </div>
    )
}