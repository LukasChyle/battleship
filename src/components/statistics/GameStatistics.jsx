import {useEffect} from 'react';
import {useApiRequest} from "../../api/apiHooks.js";
import {axiosService} from "../../api/axiosService.js";
import {Paper, Typography} from "@mui/material";
import {useIntl} from "react-intl";
import {messages} from "./Statistics.messages.js";

export default function GameStatistics({refresh}) {
    const intl = useIntl()

    const {
        data: statistics,
        loading: statsLoading,
        error: statsError,
        execute: fetchStats
    } = useApiRequest(axiosService.getGameStatistics);

    const {
        data: activeGames,
        loading: gamesLoading,
        error: gamesError,
        execute: fetchGames
    } = useApiRequest(axiosService.getCurrentGames);

    useEffect(() => {
        fetchStats().catch(console.error);
        fetchGames().catch(console.error);
    }, [refresh]);

    if (statsLoading || gamesLoading) {
        return <div>Loading...</div>;
    }
    if (statsError || gamesError) {
        return <div>Error loading data</div>;
    }

    return (
        <Paper elevation={5}
               sx={{paddingLeft: "20px", paddingRight: "20px", paddingTop: "10px", paddingBottom: "10px"}}>
            {activeGames && (
                <Typography variant="h6" component="div" fontWeight="bold">
                    {intl.formatMessage(messages.currentActiveGames)}: {activeGames.activeGames}
                </Typography>
            )}
            <Typography variant="h7" component="div" fontWeight="normal" sx={{marginTop: "10px"}}>
                {intl.formatMessage(messages.statisticsInfo)}:
            </Typography>
            {statistics && (
                <div>
                    <Typography variant="h7" component="div" fontWeight="bold">
                        {intl.formatMessage(messages.gamesStarted)}: {statistics.pvpGamesTotal}
                    </Typography>
                    <Typography variant="h7" component="div" fontWeight="bold">
                        {intl.formatMessage(messages.gamesCompleted)}: {statistics.pvpGamesCompleted}
                    </Typography>
                    <Typography variant="h7" component="div" fontWeight="bold">
                        {intl.formatMessage(messages.hits)}: {statistics.pvpHits}
                    </Typography>
                    <Typography variant="h7" component="div" fontWeight="bold">
                        {intl.formatMessage(messages.misses)}: {statistics.pvpMisses}
                    </Typography>
                    <Typography variant="h7" component="div" fontWeight="bold">
                        {intl.formatMessage(messages.averageHitRatio)}: {Math.trunc((statistics.pvpHits / (statistics.pvpHits
                        + statistics.pvpMisses))* 100)} %
                    </Typography>
                    <Typography variant="h7" component="div" fontWeight="bold">
                        {intl.formatMessage(messages.shipsSunk)}: {statistics.pvpShipsSunk}
                    </Typography>
                </div>
            )}
        </Paper>
    );
}
