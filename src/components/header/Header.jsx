import {AppBar, FormControlLabel, Switch, Toolbar, Typography} from "@mui/material";

export default function ({onIsDarkMode, isDarkMode}) {

    const handleDarkModeSwitch = () => {
        window.sessionStorage.setItem("isDarkMode", !isDarkMode)
        onIsDarkMode(isDarkMode => !isDarkMode)
    }

    return (
        <AppBar
            position="sticky"
            component="header"
            sx={{paddingLeft: "20px", paddingRight: "20px"}}
        >
            <Toolbar variant="dense">
                <Typography
                    variant="h5"
                    component="div"
                    sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                >
                    BATTLESHIPS
                </Typography>
                <FormControlLabel
                    sx={{
                        fontSize: "12px"
                    }}
                    control={
                        <Switch
                            checked={isDarkMode}
                            color="primary"
                            onChange={handleDarkModeSwitch}
                        />}
                    label="Dark"
                    labelPlacement="start"
                />
            </Toolbar>
        </AppBar>
    )

}