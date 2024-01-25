// import {useState} from "react";

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
    // const [boat1, setBoat1] = useState({length: 3, isHorizontal: false, row: 1, col: 1}) // TODO should this be a component instead?

    return (
        <div>
            Hello World!

            <Board/>
        </div>
    )
}

function Board() {

    return (
        <div>
            {board.map((row, i) => (
                <div key={i}>
                    {row.map((cell, j) => (
                        <BoardTile key={cell} row={i} col={j}>{cell}</BoardTile>
                    ))}
                </div>
            ))}
        </div>
    )
}

function BoardTile({row, col, children}) {

    console.log("row:" + row + " col:" + col + " child:"+ children)

    return (
        <span className="boardTile">
            {(row + 1) + children} ,
        </span>
    )
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
