import {messages} from "../game/Game.messages.js";

export default class GameStateFormatter {

    constructor(intl, theme) {
        this.intl = intl;
        this.theme = theme;
    }

    getStateMessage(state) {
        switch (state) {
            case "WAITING_OPPONENT":
                return {
                    string: this.intl.formatMessage(messages.gameStateWaitingOpponent),
                    color: this.theme.palette.customText.blue
                }
            case "TURN_OWN":
                return {
                    string: this.intl.formatMessage(messages.gameStateTurnOwn),
                    color: this.theme.palette.customText.green
                }
            case "TURN_OPPONENT":
                return {
                    string: this.intl.formatMessage(messages.gameStateTurnOpponent),
                    color: this.theme.palette.customText.blue
                }
            case "OPPONENT_LEFT":
                return {
                    string: this.intl.formatMessage(messages.gameStateOpponentLeft),
                    color: '#f44336'

                }
            case "WON":
                return {
                    string: this.intl.formatMessage(messages.gameStateWon),
                    color: '#4caf50'

                }
            case "LOST":
                return {
                    string: this.intl.formatMessage(messages.gameStateLost),
                    color: '#f44336'

                }
            case "TIMEOUT_OWN":
                return {
                    string: this.intl.formatMessage(messages.gameStateTimeoutOwn),
                    color: '#f44336'

                }
            case "TIMEOUT_OPPONENT":
                return {
                    string: this.intl.formatMessage(messages.gameStateTimeoutOpponent),
                    color: '#4caf50'

                }
            case "NO_GAME":
                return {
                    string: this.intl.formatMessage(messages.gameStateNoGame),
                    color: '#f44336'

                }
            default:
                return ""
        }
    }
}