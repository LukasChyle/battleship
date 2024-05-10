import {defineMessages} from "react-intl"

export const messages = defineMessages({
    instructionsTitle: {
        id: "game.setUp.instructionsTitle",
        defaultMessage: "Placement",
        description: "instructions title for setup",
    },
    instructionsContent: {
        id: "game.setUp.instructionsContent",
        defaultMessage: "Drag and drop the 5 ships onto the board as you wish. Once a ship is placed, you can rotate it using the button located in the upper left corner of the ship.",
        description: "instructions content for setup",
    },
    startGameButton: {
        id: "game.setUp.startGameButton",
        defaultMessage: "START GAME",
        description: "text of start game button",
    },
    leaveGameButton: {
        id: "game.session.leaveGameButton",
        defaultMessage: "LEAVE GAME",
        description: "text of leave game button",
    },
    leaveGameAlertDialog: {
        id: "game.session.leaveGameAlertDialog",
        defaultMessage: "Are you sure you want to leave this game?",
        description: "leave game content for alert dialog",
    },
    stayButton: {
        id: "game.session.stayButton",
        defaultMessage: "Stay",
        description: "text of stay button",
    },
    leaveButton: {
        id: "game.session.leaveButton",
        defaultMessage: "Leave",
        description: "text of leave button",
    },
    waitingOpponentDialogContent: {
        id: "game.session.waitingOpponentDialogContent",
        defaultMessage: "Waiting for an opponent",
        description: "content for alert waitingOpponentDialog",
    },
    logMessageOwnDidHit: {
        id: "game.session.logMessageOwnDidHit",
        defaultMessage: "You hit a ship at ",
        description: "log message version: own strike did hit",
    },
    logMessageOwnDidMiss: {
        id: "game.session.logMessageOwnDidMiss",
        defaultMessage: "You missed at ",
        description: "log message version: own strike did miss",
    },
    logMessageOpponentDidHit: {
        id: "game.session.logMessageOpponentDidHit",
        defaultMessage: "Enemy hit a ship at ",
        description: "log message version: opponent strike did hit",
    },
    logMessageOpponentDidMiss: {
        id: "game.session.logMessageOpponentDidMiss",
        defaultMessage: "Enemy missed at ",
        description: "log message version: opponent strike did miss",
    },
    ownBoardTitle: {
        id: "game.session.ownBoardTitle",
        defaultMessage: "Own",
        description: "The title for own play board",
    },
    opponentBoardTitle: {
        id: "game.session.opponentBoardTitle",
        defaultMessage: "Enemy",
        description: "The title for opponent play board",
    },
    gameLogWindowTitle: {
        id: "game.session.gameLogWindowTitle",
        defaultMessage: "Game log",
        description: "The title for the game log window",
    },
})