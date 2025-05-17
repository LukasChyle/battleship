import {defineMessages} from "react-intl"

export const messages = defineMessages({
  loadingData: {
    id: "statistics.data.loadingData",
    defaultMessage: "Loading data...",
    description: "info text while loading data",
  },
  errorLoadingData: {
    id: "statistics.data.errorLoadingData",
    defaultMessage: "Error loading data",
    description: "Error text if loading data failed",
  },
  statisticsInfo: {
    id: "statistics.data.statisticsInfo",
    defaultMessage: "Statistics about all games played so far",
    description: "info about the statistics",
  },
  statisticsPvpGamesHeader: {
    id: "statistics.data.statisticsPvpHeader",
    defaultMessage: "Player vs player",
    description: "Header for the PVP statistics",
  },
  statisticsAiGamesHeader: {
    id: "statistics.data.statisticsAiHeader",
    defaultMessage: "AI games",
    description: "Header for the AI statistics",
  },
  playerStatisticsAgainstAiHeader: {
    id: "statistics.data.playerStatisticsAgainstAiHeader",
    defaultMessage: "By player against AI",
    description: "Header player statistics against AI",
  },
  aiStatisticsAgainstPlayerHeader: {
    id: "statistics.data.aiStatisticsAgainstPlayerHeader",
    defaultMessage: "By AI against player",
    description: "Header AI statistics against player",
  },
  openStatisticsButton: {
    id: "statistics.data.openStatisticsButton",
    defaultMessage: "Statistics",
    description: "button text for opening the statistics dialog",
  },
  closeStatisticsButton: {
    id: "statistics.data.closeStatisticsButton",
    defaultMessage: "Close",
    description: "button text for closing the statistics dialog",
  },
  currentActiveGames: {
    id: "statistics.data.currentActiveGames",
    defaultMessage: "Current active games",
    description: "info about number of current active games",
  },
  gamesStarted: {
    id: "statistics.data.gamesStarted",
    defaultMessage: "Games started",
    description: "info about total number of games Started",
  },
  gamesCompleted: {
    id: "statistics.data.gamesCompleted",
    defaultMessage: "Games completed",
    description: "info about number of games completed",
  },
  gamesWonAgainstAi: {
    id: "statistics.data.gamesWonAgainstAi",
    defaultMessage: "Games won against AI",
    description: "info about number of games won against AI",
  },
  gamesPlayerLeft: {
    id: "statistics.data.gamesPlayerLeft",
    defaultMessage: "Games where player left",
    description: "info about number of games where the player left",
  },
  hits: {
    id: "statistics.data.hits",
    defaultMessage: "Hits",
    description: "info about total number of hits",
  },
  misses: {
    id: "statistics.data.misses",
    defaultMessage: "Misses",
    description: "info about total number of misses",
  },
  averageHitRatio: {
    id: "statistics.data.averageHitRatio",
    defaultMessage: "Average accuracy",
    description: "info about average hit ratio",
  },
  shipsSunk: {
    id: "statistics.data.shipsSunk",
    defaultMessage: "Sunken ships",
    description: "info about total number of sunken ships",
  },
})