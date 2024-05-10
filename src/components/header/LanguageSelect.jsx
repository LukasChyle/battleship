import {FormControl, MenuItem, Select, useTheme} from "@mui/material";

export default function LanguageSelect({locale, onLocale}) {
    const theme = useTheme()

    const handleChange = (e) => {
        onLocale(e)
        window.localStorage.setItem("lang", e)
    }

    return (
        <FormControl variant="standard" sx={{marginRight: 2, minWidth: 90}}>
            <Select
                sx={{color: theme.palette.customText.header}}
                name="languages"
                value={locale}
                onChange={e => handleChange(e.target.value)}
            >
                <MenuItem value={"en"}>{"English"}</MenuItem>
                <MenuItem value={"sv"}>{"Svenska"}</MenuItem>
            </Select>
        </FormControl>
    )
}