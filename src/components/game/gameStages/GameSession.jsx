import GameBoard from "../../gameBoards/gameBoard/GameBoard.jsx";
import {Alert, Button, Grid, Paper, Snackbar, Typography} from "@mui/material";
import GameLogList from "./components/GameLogList.jsx";
import {useEffect, useState} from "react";
import useWebSocket from "react-use-websocket";
import WaitingOpponentDialog from "../../dialogs/WaitingOpponentDialog.jsx";
import ConnectionState from "../../connectionState/ConnectionState.jsx";
import AlertDialog from "../../dialogs/AlertDialog.jsx";
import GameState from "./components/GameState.jsx";
import PlayerScore from "./components/PlayerScore.jsx";
import {properties} from "../../../../properties.js";
import TurnTimer from "./components/TurnTimer.jsx";
import {useIntl} from "react-intl";
import {messages} from "../Game.messages.js";
import GameOverDialog from "../../dialogs/GameOverDialog.jsx";

export default function GameSession({
  ships,
  setIsPlayingGame,
  isPlayingWithAI,
  isPlayingWithFriend,
  joinGameCode,
  setJoinGameCode
}) {
  const intl = useIntl()
  const [openWaitingDialog, setOpenWaitingDialog] = useState(false);
  const [openGameOverDialog, setGameOverDialog] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [gameState, setGameState] = useState("");
  const [ownShips, setOwnShips] = useState(ships);
  const [opponentSunkenShips, setOpponentSunkenShips] = useState([]);
  const [opponentStrikes, setOpponentStrikes] = useState([]);
  const [ownStrikes, setOwnStrikes] = useState([]);
  const [gameLogMessages, setGameLogMessages] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameId, setGameId] = useState("");
  const [turnSecondsLeft, setTurnSecondsLeft] = useState(0)

  const {sendJsonMessage, lastJsonMessage, lastMessage, readyState} =
    useWebSocket(properties.webSocketURL + "/play", {
        shouldReconnect: () => {
          const isPlaying = window.sessionStorage.getItem("isPlayingGame") === "true";
          return !isGameOver && isPlaying;
        },
        reconnectAttempts: 10,
        reconnectInterval: 3000,
        retryOnError: true,
        heartbeat: {
          interval: 10000,
          message: "ping",
          pongTimeout: 5000,
        }
      }
    )

  useEffect(() => {
    if (lastMessage !== null && typeof lastMessage.data === 'string') {
      try {
        JSON.parse(lastMessage.data);
      } catch (e) {
        if (lastMessage.data.startsWith("ping")) {
          console.log('WebSocket string message:', lastMessage.data);
        }
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    if (readyState === WebSocket.OPEN) {
      if (window.sessionStorage?.getItem('gameId')) {
        sendJsonMessage({
          type: "RECONNECT",
          gameId: window.sessionStorage.getItem('gameId'),
          strikeRow: null,
          strikeColumn: null,
          ships: ships
        })
      } else {
        if (isPlayingWithAI) {
          sendJsonMessage({
            type: "JOIN_AI",
            gameId: null,
            strikeRow: null,
            strikeColumn: null,
            ships: ships
          })
        } else {
          sendJsonMessage({
            type: isPlayingWithFriend ? "JOIN_FRIEND" : "JOIN",
            gameId: joinGameCode.length === 36 ? joinGameCode : null,
            strikeRow: null,
            strikeColumn: null,
            ships: ships
          })
        }
      }
      if (window.sessionStorage?.getItem("messages")) {
        setGameLogMessages(JSON.parse(window.sessionStorage.getItem("messages")))
      }
    } else {
      setOpenWaitingDialog(false)
    }
  }, [readyState]);

  //TODO: Move WebSocket into own component.
  //TODO: Create an about tab in the header, explaining about the project.
  //TODO: Refactor tiles and ships in setUp to use row and column instead of id.
  //TODO: see if Ship do need the variable of ID, or if it can be removed before sending ships to backend.
  //TODO: in gameSetUp, test if the server is online and if not write a message box and block "start game"

  useEffect(() => {
    if (!lastJsonMessage) {
      return;
    }
    const {
      gameId,
      eventType,
      opponentStrikes,
      ownStrikes,
      timeLeft,
      ownActiveShips,
      ownSunkenShips,
      opponentSunkenShips
    } = lastJsonMessage;

    eventType && setGameState(eventType)
    timeLeft && setTurnSecondsLeft(timeLeft)

    ownActiveShips && setOwnShips(convertShips(ownActiveShips, false));
    opponentSunkenShips && setOpponentSunkenShips(convertShips(opponentSunkenShips, true))
    if (ownActiveShips && ownSunkenShips) {
      setOwnShips(prevState => [...prevState, ...convertShips(ownSunkenShips, true)])
    } else if (ownSunkenShips) {
      setOwnShips(convertShips(ownSunkenShips, true))
    }

    if (opponentStrikes || ownStrikes) {
      opponentStrikes && setOpponentStrikes(opponentStrikes);
      ownStrikes && setOwnStrikes(ownStrikes);

      const sunkAShip = ownSunkenShips || opponentSunkenShips;
      const isOwnTurn = eventType === "TURN_OWN" || eventType === "LOST";
      const lastStrike = isOwnTurn ? opponentStrikes.at(-1) : ownStrikes.at(-1);

      if (lastStrike) {
        const {coordinate, hit} = lastStrike;
        createGameLogMessage(coordinate.row, coordinate.column, hit, isOwnTurn, sunkAShip);
      }
    }
    if (["WON", "LOST", "OPPONENT_LEFT", "NO_GAME", "TIMEOUT_OWN", "TIMEOUT_OPPONENT"].includes(eventType)) {
      setIsGameOver(true);
      window.sessionStorage.removeItem("gameId");
      window.sessionStorage.removeItem("isPlayingGame");
      setTurnSecondsLeft(0);
      setGameOverDialog(true);
      setJoinGameCode("");
      return
    }
    if (gameId) {
      setGameId(gameId)
      window.sessionStorage.setItem("gameId", gameId)
    }
    if (eventType === "WAITING_OPPONENT" || eventType === "WAITING_FRIEND") {
      setOpenWaitingDialog(true)
    } else if (eventType !== undefined) {
      setOpenWaitingDialog(false)
    }
  }, [lastJsonMessage]);

  const convertShips = (ships, isSunk) =>
    ships.map(e => ({
      id: e.id,
      isHorizontal: e.isHorizontal,
      length: e.length,
      row: e.row,
      column: e.column,
      isSunk: isSunk
    }));

  const handleStrike = (e) => {
    if (gameState === "TURN_OWN") {
      if (e !== null) {
        sendJsonMessage({
          type: "STRIKE",
          gameId: gameId,
          strikeRow: e.row,
          strikeColumn: e.column,
          ships: null
        })
      }
    } else {
      setShowSnackbar(true)
    }
  }

  const handleLeaveGame = () => {
    if (readyState === 1) {
      sendJsonMessage({
        type: "LEAVE",
        gameId: gameId,
        strikeRow: null,
        strikeColumn: null,
        ships: null
      })
    }
    window.sessionStorage.removeItem("messages")
    window.sessionStorage.removeItem("gameId")
    window.sessionStorage.removeItem("isPlayingGame")
    setTurnSecondsLeft(0)
    setOpenWaitingDialog(false)
    setGameOverDialog(false)
    setIsGameOver(true)
    setIsPlayingGame(false)
    setJoinGameCode("");
    setGameState("")
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false)
  }

  const createGameLogMessage = (row, column, isHit, isOwnTurn, sunkAShip) => {
    const position = String.fromCharCode(97 + +row).toUpperCase()
      + (+column + 1)

    const content = () => {
      if (isOwnTurn) {
        if (isHit) {
          if (sunkAShip) {
            return intl.formatMessage(messages.logMessageOpponentDidSinkShip) + position
          }
          return intl.formatMessage(messages.logMessageOpponentDidHit) + position
        }
        return intl.formatMessage(messages.logMessageOpponentDidMiss) + position
      }
      if (isHit) {
        if (sunkAShip) {
          return intl.formatMessage(messages.logMessageOwnDidSinkShip) + position
        }
        return intl.formatMessage(messages.logMessageOwnDidHit) + position
      }
      return intl.formatMessage(messages.logMessageOwnDidMiss) + position
    }

    const today = new Date()
    const message = {
      isOwnAction: !isOwnTurn,
      content: content(),
      isHit: isHit,
      sunkAShip: sunkAShip,
      time: today.getHours().toString().padStart(2, '0') + ":" + today.getMinutes().toString().padStart(2, '0')
    }
    setGameLogMessages(messages => [...messages, message])
    window.sessionStorage.setItem("messages", JSON.stringify([...gameLogMessages, message]))
  }

  return (
    <div>
      <WaitingOpponentDialog
        isOpen={openWaitingDialog}
        handleLeave={handleLeaveGame}
        isPlayingWithFriend={isPlayingWithFriend}
        gameId={gameId}
      />
      <GameOverDialog
        isOpen={openGameOverDialog}
        handleLeave={handleLeaveGame}
        state={gameState}
      />
      <Grid container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "12px",
            }}>
        <Grid item xs={12} md={2}>
          <ConnectionState style={{marginBottom: "12px"}} state={readyState}/>
          {isGameOver ?
            <Button
              sx={{boxShadow: 5}}
              size="small"
              variant="contained"
              color="primary"
              onClick={handleLeaveGame}>
              {intl.formatMessage(messages.leaveGameButton)}
            </Button>
            :
            <AlertDialog
              dialogButtonText={intl.formatMessage(messages.leaveGameButton)}
              acceptDialogButtonText={intl.formatMessage(messages.leaveButton)}
              cancelDialogButtonText={intl.formatMessage(messages.stayButton)}
              title={intl.formatMessage(messages.leaveGameAlertDialog)}
              onAccept={handleLeaveGame}/>}
        </Grid>
        <Grid item xs={0} md={1}/>
        <Grid item xs={12} md={3}>
          <GameState state={gameState}/>
        </Grid>
        <Grid item xs={0} md={2}>
          <TurnTimer gameState={gameState} turnSecondsLeft={turnSecondsLeft}
                     setTurnSecondsLeft={setTurnSecondsLeft}/>
        </Grid>
        <Grid item xs={0} md={3}/>
      </Grid>
      <Grid container spacing={10}>
        <Grid item xs={12} md={5} sx={{
          display: "grid",
          alignContent: "center",
          justifyContent: "right",
          marginTop: "24px",
        }}>
          <Grid container>
            <Grid item xs={12} md={3}>
              <Typography variant="h5" component="div">
                {intl.formatMessage(messages.ownBoardTitle)}
              </Typography>

            </Grid>
            <Grid item xs={12} md={9}>
              <PlayerScore strikes={opponentStrikes}/>
            </Grid>
          </Grid>
          <Paper elevation={7}>
            <GameBoard isOwnBoard={true}
                       ships={ownShips}
                       tileStrikes={opponentStrikes}/>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} sx={{
          display: "grid",
          alignContent: "center",
          justifyContent: "center",
          marginTop: "24px"
        }}>
          <Grid container>
            <Grid item xs={12} md={3}>
              <Typography variant="h5" component="div">
                {intl.formatMessage(messages.opponentBoardTitle)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <PlayerScore strikes={ownStrikes}/>
            </Grid>
          </Grid>
          <Paper elevation={7}>
            <GameBoard isOwnBoard={false}
                       ships={opponentSunkenShips}
                       handleStrike={handleStrike}
                       tileStrikes={ownStrikes}/>
          </Paper>

        </Grid>
        <Grid item xs={12} md={2} sx={{
          alignContent: "center",
          justifyContent: "left",
          marginTop: "24px"
        }}>
          <Typography variant="h5" component="div">
            {intl.formatMessage(messages.gameLogWindowTitle)}
          </Typography>
          <GameLogList messages={gameLogMessages}/>
        </Grid>
      </Grid>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
      >
        <Alert
          severity="error"
          variant="filled">
          Not your turn.
        </Alert>
      </Snackbar>
    </div>
  )
}