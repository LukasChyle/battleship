import {defineMessages} from "react-intl"

export const messages = defineMessages({
    statisticsInfo: {
        id: "statistics.data.statisticsInfo",
        defaultMessage: "Statistics about all games played so far",
        description: "info about the statistics",
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