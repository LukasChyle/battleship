import {useEffect} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {messages} from "../statistics/Statistics.messages.js";
import {useIntl} from "react-intl";
import {useApiRequest} from "../../api/apiHooks.js";
import {axiosService} from "../../api/axiosService.js";

export default function StatisticsDialog({isOpen, setIsOpen}) {
    const intl = useIntl()

    const handleCloseDialogButton = () => {
        setIsOpen(false)
    }

    const {
        data: statistics,
        loading: statsLoading,
        error: statsError,
        execute: fetchStats
    } = useApiRequest(axiosService.getGameStatistics);

    useEffect(() => {
        fetchStats().catch(console.error);
    }, [isOpen]);

    if (statsLoading) {
        return <div>Loading...</div>;
    }

    if (statsError) {
        return <div>Error loading data</div>;
    }

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={isOpen}
            aria-labelledby="statistics-dialog-title"
            aria-describedby="statistics-dialog-description"
        >
            <DialogTitle
                sx={{display: "grid", justifyContent: "center"}}
                fontWeight="bold"
                id="dialog-title">
                <Typography variant="h7" component="div" fontWeight="normal" sx={{marginTop: "10px"}}>
                    {intl.formatMessage(messages.statisticsInfo)}:
                </Typography>
            </DialogTitle>
            <DialogContent sx={{display: "grid", justifyContent: "center"}}>
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
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{boxShadow: 5}}
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={handleCloseDialogButton}>
                    {intl.formatMessage(messages.closeStatisticsButton)}
                </Button>
            </DialogActions>
        </Dialog>

    )
}