import {defineMessages} from "react-intl"

export const messages = defineMessages({
    instructionsTitle: {
        id: "game.setUp.instructionsTitle",
        defaultMessage: "Instruction",
        description: "instructions title for setup",
    },
    instructionsPlacement: {
        id: "game.setUp.instructionsPlacement",
        defaultMessage: "Drag and drop the 5 ships onto the board as you wish. Once a ship is placed, you can rotate it using the arrow button located in the upper left corner of the ship.",
        description: "instructions on how to place the ships",
    },
    instructionsStartGame: {
        id: "game.setUp.instructionsStartGame",
        defaultMessage: "Start the game in the mode you wish to play.",
        description: "instructions on how to start the game",
    },
    instructionsPlayWithFriend: {
        id: "game.setUp.instructionsPlayWithFriend",
        defaultMessage: "To play against a friend: a code will be generated when creating a game for a friend, your friend have to paste in the code to be able to join the game.",
        description: "instructions on how to play with a friend",
    },
    startGameAgainstAiButton: {
        id: "game.setUp.startGameAgainstAiButton",
        defaultMessage: "PLAY AGAINST AI",
        description: "text of start game against ai button",
    },
    startGameAgainstPlayerButton: {
        id: "game.setUp.startGameAgainstPlayerButton",
        defaultMessage: "PLAY AGAINST PLAYER",
        description: "text of start game against random player button",
    },
    startGameForFriendButton: {
        id: "game.setUp.startGameForFriendButton",
        defaultMessage: "CREATE GAME FOR FRIEND",
        description: "text of start game for a friend button",
    },
    joinFriendWithCodeButton: {
        id: "game.setUp.joinFriendWithCodeButton",
        defaultMessage: "JOIN FRIEND WITH CODE",
        description: "text of join a Friend game with code button",
    },
    enterCodeToJoinInputPlaceholder: {
        id: "game.setUp.enterCodeToJoinInputPlaceholder",
        defaultMessage: "Paste the code here",
        description: "text of input placeholder for code to join friend game",
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
    waitingOpponentDialogContent: {
        id: "game.session.waitingOpponentDialogContent",
        defaultMessage: "Waiting for an opponent",
        description: "Content text for waiting opponent",
    },
    waitingFriendDialogContent: {
        id: "game.session.waitingFriendDialogContent",
        defaultMessage: "Waiting for a friend to join with code",
        description: "content text for waiting friend",
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
    logMessageOwnDidSinkShip: {
        id: "game.session.logMessageOwnDidSinkShip",
        defaultMessage: "You sank a ship with ",
        description: "log message version: own strike did sink ship",
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
    logMessageOpponentDidSinkShip: {
        id: "game.session.logMessageOpponentDidSinkShip",
        defaultMessage: "Enemy sank a ship with ",
        description: "log message version: opponent strike did sink ship",
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
    turnTimerTitle: {
        id: "game.session.turnTimerTitle",
        defaultMessage: "Time left",
        description: "The title for the turn timer",
    },
    playerScoreHits: {
        id: "game.session.playerScoreHits",
        defaultMessage: "Hits",
        description: "The title for number of hits",
    },
    playerScoreMisses: {
        id: "game.session.playerScoreMisses",
        defaultMessage: "Misses",
        description: "The title for number of misses",
    },
    playerScoreHitRatio: {
        id: "game.session.playerScoreHitRatio",
        defaultMessage: "Accuracy",
        description: "The title for hit ratio",
    },
    gameStateTitle: {
        id: "game.session.gameStateTitle",
        defaultMessage: "Game state:",
        description: "Title for game state",
    },
    gameStateWaitingOpponent: {
        id: "game.session.gameStateWaitingOpponent",
        defaultMessage: "Waiting for an opponent to join",
        description: "message of game state: waiting opponent",
    },
    gameStateTurnOwn: {
        id: "game.session.gameStateTurnOwn",
        defaultMessage: "Your turn to attack",
        description: "message of game state: turn own",
    },
    gameStateTurnOpponent: {
        id: "game.session.gameStateTurnOpponent",
        defaultMessage: "Enemy's turn to attack",
        description: "message of game state: turn opponent",
    },
    gameStateOpponentLeft: {
        id: "game.session.gameStateOpponentLeft",
        defaultMessage: "Opponent left the game",
        description: "message of game state: opponent left",
    },
    gameStateWon: {
        id: "game.session.gameStateWon",
        defaultMessage: "YOU WON!",
        description: "message of game state: won",
    },
    gameStateLost: {
        id: "game.session.gameStateLost",
        defaultMessage: "You lost",
        description: "message of game state: lost",
    },
    gameStateTimeoutOwn: {
        id: "game.session.gameStateTimeoutOwn",
        defaultMessage: "Turn expired, you lost",
        description: "message of game state: timeout own",
    },
    gameStateTimeoutOpponent: {
        id: "game.session.gameStateTimeoutOpponent",
        defaultMessage: "Turn expired, You won!",
        description: "message of game state: timeout opponent",
    },
    gameStateNoGame: {
        id: "game.session.gameStateNoGame",
        defaultMessage: "The game you tried to reconnect don't exist anymore",
        description: "message of game state: no game",
    },
})