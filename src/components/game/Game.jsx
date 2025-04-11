import {useEffect, useState} from "react";
import GameSession from "./gameStages/GameSession.jsx";
import GameSetUp from "./gameStages/GameSetUp.jsx";

const getInitialShips = [
    {id: "ship-1", isHorizontal: true, length: 2, row: undefined, column: undefined},
    {id: "ship-2", isHorizontal: true, length: 2, row: undefined, column: undefined},
    {id: "ship-3", isHorizontal: true, length: 3, row: undefined, column: undefined},
    {id: "ship-4", isHorizontal: true, length: 4, row: undefined, column: undefined},
    {id: "ship-5", isHorizontal: true, length: 5, row: undefined, column: undefined},
]
export default function Game() {
    const [ships, setShips] = useState(getInitialShips);
    const [isPlayingGame, setIsPlayingGame] = useState(false);

    useEffect(() => {
        if (window.sessionStorage?.getItem("isPlayingGame")) {
            setIsPlayingGame(window.sessionStorage.getItem("isPlayingGame"))
        }
    }, []);

    return (
        <div>
            {isPlayingGame ?
                <GameSession
                    ships={ships}
                    onIsPlayingGame={setIsPlayingGame}
                />
                :
                <GameSetUp
                    ships={ships}
                    onShips={setShips}
                    onIsPlayingGame={setIsPlayingGame}
                />}
        </div>
    )
}