import {defineMessages} from "react-intl"

export const messages = defineMessages({
    title: {
        id: "connectionState.title",
        defaultMessage: "Connection state",
        description: "title above the connection state window",
    },
    open: {
        id: "connectionState.open",
        defaultMessage: "Connected",
        description: "display text for open state",
    },
    connecting: {
        id: "connectionState.connecting",
        defaultMessage: "Connecting",
        description: "display text for connecting state",
    },
    closing: {
        id: "connectionState.closing",
        defaultMessage: "Closing",
        description: "display text for closing state",
    },
    closed: {
        id: "connectionState.closed",
        defaultMessage: "Disconnected",
        description: "display text for closed state",
    },
    uninstantiated: {
        id: "connectionState.uninstantiated",
        defaultMessage: "Error",
        description: "display text for uninstantiated state",
    },
})