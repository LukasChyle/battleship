import {useEffect} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography} from "@mui/material";
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

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={isOpen}
      aria-labelledby="statistics-dialog-title"
      aria-describedby="statistics-dialog-description"
      keepMounted={false}
      disablePortal={false}
      disableEnforceFocus={false}
      disableRestoreFocus={false}
    >
      {statsError ?
        <div>
          <Typography variant="h7" component="div">
            {intl.formatMessage(messages.errorLoadingData)}
          </Typography>
        </div>
        :
        <div>
          <DialogTitle
            sx={{display: "grid", justifyContent: "center"}}
            fontWeight="bold"
            id="dialog-title">
            <Typography variant="h7" component="div" fontWeight="normal" sx={{marginTop: "10px"}}>
              {intl.formatMessage(messages.statisticsInfo)}:
            </Typography>
          </DialogTitle>
          <DialogContent sx={{display: "grid", justifyContent: "center"}}>
            {statsLoading || !statistics ?
              <Typography variant="h7" component="div">
                {intl.formatMessage(messages.loadingData)}
              </Typography>
              :
              <div>
                <Grid container alignItems="center">
                  <Grid item xs={12} md={12}>
                    <Typography variant="h7" component="div" fontWeight="bold" sx={{marginTop: "10px"}}>
                      {intl.formatMessage(messages.statisticsPvpGamesHeader)}
                    </Typography>
                    <Typography variant="h7" component="div">
                      {intl.formatMessage(messages.gamesStarted)}: {statistics.pvpGamesTotal}
                    </Typography>
                    <Typography variant="h7" component="div">
                      {intl.formatMessage(messages.gamesCompleted)}: {statistics.pvpGamesCompleted + " (" +
                      Math.trunc(((statistics.pvpGamesCompleted) / (statistics.pvpGamesTotal)) * 100) + "%)"}
                    </Typography>
                    <Typography variant="h7" component="div">
                      {intl.formatMessage(messages.gamesPlayerLeft)}: {statistics.pvpGamesTotal
                      - statistics.pvpGamesCompleted}
                    </Typography>
                    <Typography variant="h7" component="div">
                      {intl.formatMessage(messages.hits)}: {statistics.pvpHits}
                    </Typography>
                    <Typography variant="h7" component="div">
                      {intl.formatMessage(messages.misses)}: {statistics.pvpMisses}
                    </Typography>
                    <Typography variant="h7" component="div">
                      {intl.formatMessage(messages.averageHitRatio)}: {Math.trunc(
                      (statistics.pvpHits / (statistics.pvpHits
                        + statistics.pvpMisses)) * 100) + "%"}
                    </Typography>
                    <Typography variant="h7" component="div">
                      {intl.formatMessage(messages.shipsSunk)}: {statistics.pvpShipsSunk}
                    </Typography>
                    <Typography variant="h7" component="div" fontWeight="bold" sx={{marginTop: "10px"}}>
                      {intl.formatMessage(messages.statisticsAiGamesHeader)}
                    </Typography>
                    <Typography variant="h7" component="div">
                      {intl.formatMessage(messages.gamesStarted)}: {statistics.aiGamesTotal}
                    </Typography>
                    <Typography variant="h7" component="div">
                      {intl.formatMessage(messages.gamesCompleted)}: {statistics.aiGamesCompleted + " (" +
                      Math.trunc(((statistics.aiGamesCompleted) / (statistics.aiGamesTotal)) * 100) + "%)"}
                    </Typography>
                    <Typography variant="h7" component="div">
                      {intl.formatMessage(messages.gamesPlayerLeft)}: {statistics.aiGamesTotal
                      - statistics.aiGamesCompleted}
                    </Typography>
                    <Typography variant="h7" component="div">
                      {intl.formatMessage(messages.gamesWonAgainstAi)}: {statistics.aiGamesWon}
                    </Typography>
                    <Typography variant="h7" component="div" fontWeight="bold" sx={{marginTop: "10px"}}>
                      {intl.formatMessage(messages.playerStatisticsAgainstAiHeader)}
                    </Typography>
                    <Typography variant="h7" component="div">
                      {intl.formatMessage(messages.hits)}: {statistics.aiPlayerHits}
                    </Typography>
                    <Typography variant="h7" component="div">
                      {intl.formatMessage(messages.misses)}: {statistics.aiPlayerMisses}
                    </Typography>
                    <Typography variant="h7" component="div">
                      {intl.formatMessage(messages.averageHitRatio)}: {Math.trunc(
                      (statistics.aiPlayerHits / (statistics.aiPlayerHits
                        + statistics.aiPlayerMisses)) * 100) + "%"}
                    </Typography>
                    <Typography variant="h7" component="div">
                      {intl.formatMessage(messages.shipsSunk)}: {statistics.aiOpponentShipsSunk}
                    </Typography>
                    <Typography variant="h7" component="div" fontWeight="bold" sx={{marginTop: "10px"}}>
                      {intl.formatMessage(messages.aiStatisticsAgainstPlayerHeader)}
                    </Typography>
                    <Typography variant="h7" component="div">
                      {intl.formatMessage(messages.hits)}: {statistics.aiOpponentHits}
                    </Typography>
                    <Typography variant="h7" component="div">
                      {intl.formatMessage(messages.misses)}: {statistics.aiOpponentMisses}
                    </Typography>
                    <Typography variant="h7" component="div">
                      {intl.formatMessage(messages.averageHitRatio)}: {Math.trunc(
                      (statistics.aiOpponentHits / (statistics.aiOpponentHits
                        + statistics.aiOpponentMisses)) * 100) + "%"}
                    </Typography>
                    <Typography variant="h7" component="div">
                      {intl.formatMessage(messages.shipsSunk)}: {statistics.aiPlayerShipsSunk}
                    </Typography>
                  </Grid>
                </Grid>


              </div>
            }
          </DialogContent>
        </div>}
      <DialogActions>
        <Button
          sx={{boxShadow: 5, marginRight: "20px", marginBottom: "20px"}}
          size="small"
          variant="contained"
          color="primary"
          onClick={handleCloseDialogButton}
          aria-expanded={isOpen}
          aria-label={intl.formatMessage(messages.closeStatisticsButton)}>
          {intl.formatMessage(messages.closeStatisticsButton)}
        </Button>
      </DialogActions>
    </Dialog>

  )
}