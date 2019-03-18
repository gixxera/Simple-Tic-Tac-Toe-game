const squares = document.querySelectorAll(".game-btn");
const paragraph = document.querySelector("#wins");
const turn = document.querySelector("#turn");
const xWinner = document.querySelector("#xWins");
const oWinner = document.querySelector("#oWins");
const winCases = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function restart() {
  squares.forEach(function(square) {
    square.textContent = "";
    paragraph.textContent = "";
    gameEnable();
  });
}

document.querySelector("#reset").addEventListener("click", restart);

restart();

let isPlayerXturn = false;

function turns() {
  if (isPlayerXturn) {
    turn.textContent = "Turn: Player O";
  } else {
    turn.textContent = "Turn: Player X";
  }
}

turns();

function gameClick() {
  isPlayerXturn ? (this.textContent = "O") : (this.textContent = "X");
  isPlayerXturn = !isPlayerXturn;
  winner();
  turns();
}

for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener("click", gameClick);
}

let xWins = 0;
let oWins = 0;

function decideWinner(winner) {
  if (winner === "X") {
    xWins += 1;
    xWinner.textContent = `Score X: ${xWins}`;
  } else {
    oWins += 1;
    oWinner.textContent = `Score O: ${oWins}`;
  }
}

function winner() {
  const btns = [
    squares[0].textContent,
    squares[1].textContent,
    squares[2].textContent,
    squares[3].textContent,
    squares[4].textContent,
    squares[5].textContent,
    squares[6].textContent,
    squares[7].textContent,
    squares[8].textContent
  ];
  for (let i = 0; i < winCases.length; i++) {
    const [a, b, c] = winCases[i];
    if (btns[a] && btns[a] === btns[b] && btns[a] === btns[c]) {
      paragraph.textContent = `Winner is ${btns[a]}`;
      decideWinner(btns[a]);
      gameDisable();
    } else if (isDraw(btns)) {
      paragraph.textContent = "Draw!";
    }
  }
}

function isDraw(btns) {
  return btns.every(btn => btn.length > 0);
}

function gameDisable() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].removeEventListener("click", gameClick);
  }
}

function gameEnable() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", gameClick);
  }
}
