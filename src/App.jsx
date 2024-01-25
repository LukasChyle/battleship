import {useState} from "react";

const board = [
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
]

function App() {
    const [ship1, setShip1] = useState({position: {row: 5, col: 5}, isHorizontal: true, length: 3})

    return (
        <div>
            Hello World!
            <Ship isHorizontal={true} length={2}/>
            <Ship isHorizontal={true} length={3}/>
            <Ship isHorizontal={true} length={4}/>
            <Ship isHorizontal={true} length={5}/>
            <Ship isHorizontal={false} length={2}/>
            <Ship isHorizontal={false} length={3}/>
            <Ship isHorizontal={false} length={4}/>
            <Ship isHorizontal={false} length={5}/>

            <Board/>
        </div>
    )
}

function Board() {

    return (
        <div>
            {board.map((row, i) => (
                <div className="board-row" key={i}>
                    {row.map((cell, j) => (
                        <BoardTile key={cell} row={i} col={j}>{cell}</BoardTile>
                    ))}
                </div>
            ))}
        </div>
    )
}

function BoardTile({row, col, children}) {

    console.log("row:" + row + " col:" + col + " child:" + children)

    return (
        <span className="board-tile">
            <img src="src/assets/framed-water.jpg" width={75} height={75} alt="board-tile"/>
        </span>
    )
}

function Ship({isHorizontal, length}) {

    if (isHorizontal && length === 2) return <img src="src/assets/Boat_4.png" alt="ship"/>
    if (isHorizontal && length === 3) return <img src="src/assets/Boat_3.png" alt="ship"/>
    if (isHorizontal && length === 4) return <img src="src/assets/Boat_2.png" alt="ship"/>
    if (isHorizontal && length === 5) return <img src="src/assets/Boat_1.png" alt="ship"/>
    if (!isHorizontal && length === 2) return <img src="src/assets/Boat_4_vert.png" alt="ship"/>
    if (!isHorizontal && length === 3) return <img src="src/assets/Boat_3_vert.png" alt="ship"/>
    if (!isHorizontal && length === 4) return <img src="src/assets/Boat_2_vert.png" alt="ship"/>
    if (!isHorizontal && length === 5) return <img src="src/assets/Boat_1_vert.png" alt="ship"/>
    return <p>Ship Image</p>
}

export default App

/*
TODO: EXAMPLE OF 2d array

 function ChessBoard() {
  const board = [
    ["R","N","B","Q","K","B","N","R"],
    ["P","P","P","P","P","P","P","P"],
    //... more arrays
  ];

  return (
    <div>
      {board.map((row, i) => (
        <div key={i}>
          {row.map((cell, j) => (
            <span key={j}>{cell} </span>
          ))}
        </div>
      ))}
    </div>
  );
}

 */
