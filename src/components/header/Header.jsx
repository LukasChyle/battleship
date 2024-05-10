import {AppBar, FormControlLabel, Switch, Toolbar, Typography, useTheme} from "@mui/material";
import LanguageSelect from "./LanguageSelect.jsx";
import {useIntl} from "react-intl";
import {messages} from "./Header.messages.js";

export default function ({onIsDarkMode, isDarkMode, locale, onLocale}) {
    const theme = useTheme()
    const intl = useIntl()

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
                    sx={{
                        color: theme.palette.appBarText,
                        flexGrow: 1,
                        display: {xs: 'none', sm: 'block'}
                    }}
                >
                    {intl.formatMessage(messages.title)}
                </Typography>
                <LanguageSelect locale={locale} onLocale={onLocale}/>
                <FormControlLabel
                    sx={{
                        fontSize: "12px",
                        color: theme.palette.customText.header
                    }}
                    control={
                        <Switch
                            name="mode"
                            checked={isDarkMode}
                            onChange={handleDarkModeSwitch}
                        />}
                    label={intl.formatMessage(messages.darkModeSwitch)}
                    labelPlacement="start"
                />
            </Toolbar>
        </AppBar>
    )

}