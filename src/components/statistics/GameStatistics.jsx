import {useEffect, useState} from 'react';
import {useApiRequest} from "../../api/apiHooks.js";
import {axiosService} from "../../api/axiosService.js";
import {Button, Grid, Paper, Typography} from "@mui/material";
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
    return <div></div>;
  }
  if (gamesError) {
    return (
      <div>
        <Typography variant="h7" component="div">
          {intl.formatMessage(messages.errorLoadingData)}
        </Typography>
      </div>);
  }

  return (
    <div>
      <StatisticsDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}/>
      <Paper elevation={5}
             sx={{paddingLeft: "40px", paddingRight: "40px", paddingTop: "20px", paddingBottom: "20px"}}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={6}>
            {gamesLoading || !activeGames ?
              <Typography variant="h7" component="div">
                {intl.formatMessage(messages.loadingData)}
              </Typography>
              :
              <Typography variant="h6" component="div" fontWeight="bold">
                {intl.formatMessage(messages.currentActiveGames)}: {activeGames.activeGames}
              </Typography>
            }
          </Grid>
          <Grid item xs={12} md={6} align="right" sx={{display: "flex", justifyContent: "flex-end"}}>
            <Button
              sx={{boxShadow: 5}}
              size="small"
              variant="contained"
              color="primary"
              aria-expanded={isDialogOpen}
              aria-label={intl.formatMessage(messages.openStatisticsButton)}
              onClick={handleOpenDialogButton}>
              {intl.formatMessage(messages.openStatisticsButton)}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
