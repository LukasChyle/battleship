import {useEffect, useState} from 'react';
import {useApiRequest} from "../../api/apiHooks.js";
import {axiosService} from "../../api/axiosService.js";
import {Button, Paper, Typography} from "@mui/material";
import {useIntl} from "react-intl";
import {messages} from "./Statistics.messages.js";
import StatisticsDialog from "../dialogs/StatisticsDialog.jsx";

export default function GameStatistics({refresh}) {
    const intl = useIntl()
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleOpenDialogButton = () => {
        setIsDialogOpen(true)
    }

    const {
        data: activeGames,
        loading: gamesLoading,
        error: gamesError,
        execute: fetchGames
    } = useApiRequest(axiosService.getCurrentGames);

    useEffect(() => {
        fetchGames().catch(console.error);
    }, [refresh]);

    if (gamesLoading) {
        return <div>Loading...</div>;
    }
    if (gamesError) {
        return <div>Error loading data</div>;
    }

    return (
        <div>
        <StatisticsDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}/>
        <Paper elevation={5}
               sx={{paddingLeft: "20px", paddingRight: "20px", paddingTop: "10px", paddingBottom: "10px"}}>
            {activeGames && (
                <Typography variant="h6" component="div" fontWeight="bold">
                    {intl.formatMessage(messages.currentActiveGames)}: {activeGames.activeGames}
                </Typography>
            )}
            <Button
                sx={{boxShadow: 5}}
                size="small"
                variant="contained"
                color="primary"
                onClick={handleOpenDialogButton}>
                {intl.formatMessage(messages.openStatisticsButton)}
            </Button>
        </Paper>
        </div>
    );
}
