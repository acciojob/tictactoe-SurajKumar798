//your JS code here. If required.
const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const submit = document.getElementById('submit');
const boardContainer = document.getElementById('board-container');
const messageDiv = document.querySelector('.message');
const boardDiv = document.getElementById('board');

let currentPlayer = 'X';
let players = {};
let board = new Array(9).fill('');
submit.addEventListener('click', () => {
	const p1 = player1Input.value.trim();
	const p2 = player2Input.value.trim();
	if(!p1 || !p2){
		alert('please enter both players name');
		return;
	}
	players = {
		X: p1,
		O: p2
	};

	document.getElementById("player-input").style.display = "none";
	boardContainer.style.display = "block";
	messageDiv.textContent = `${players[currentPlayer]}, you're up`;

	createBoard();
});

function createBoard(){
	boardDiv.innerHTML = "";
	for(let i=0; i<9; i++){
		const cell = document.createElement("div");
		cell.classList.add("cell");
		cell.id = i + 1;
		cell.addEventListener("click", ()=> handleMove(i));
		boardDiv.appendChild(cell)
	}
}
function handleMove(index){
	if(board[index]) return;
	board[index] = currentPlayer;
	document.getElementById(index + 1).textContent = currentPlayer;
	if(checkWin()){
		messageDiv.textContent = `${players[currentPlayer]}, congratulations you won!`;
		disableBoard();
		return;
	}
	if(board.every(cell => cell)){
		messageDiv.textContent = `It's a draw!`;
		return;
	}
	currentPlayer = currentPlayer === "X" ? "O" : "X";
	messageDiv.textContent = `${players[currentPlayer]}, you're up`;
}
function checkWin(){
	const wins = [
		[0,1,2], [3,4,5], [6,7,8],
		[0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
	];
	return wins.some(([a, b, c]) => {
		return board[a] && board[a] === board[b] && board[a] === board[c];
	});
}
function disableBoard(){
	const cells = document.querySelectorAll(".cell");
	cells.forEach(cell => cell.style.pointerEvents = "none");
}