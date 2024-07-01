/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [3,5,8],
    [0,4,8],
    [2,4,6]
];


/*---------------------------- Variables (state) ----------------------------*/
let board = ['','','','','','','','',''];
let turn = 'X';
let winner = false;
let tie = false;


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');


/*-------------------------------- Functions --------------------------------*/
const switchPlayerTurn = () => {
    if(winner === true) {
        return;
    } else {
        if(turn === 'X') {
            turn = 'O'
        } else {
            turn = 'X'
        };
    };
};

const checkForTie = () => {
    if(winner === true) {
        return;
    } else if (board.includes('')) {
        return;
    } else {
        tie = true;
    };
};

const checkForWinner = () => {
    winningCombos.forEach((combo) => {
        if(board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            winner = true;
        };
    });
};

const placePiece = (index) => {
    board[index] = turn;
};

const handleClick = (event) => {
    const squareIndex = event.target.id;
    if (event.target.innerText === 'X' || event.target.innerText === 'O') {
        return;
    } else if (winner === true) {
        return;
    } else {
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
    };
};

const updateBoard = () => {
    board.forEach((boardValue, index) => {
        if(boardValue === 'X') {
            squareEls[index].innerText = 'X';
        } else if (boardValue === 'O') {
            squareEls[index].innerText = 'O';
        } else if (boardValue === '') {
            squareEls[index].innerText = '';
        };
    });
};

const updateMessage = () => {
    if(winner === false && tie === false) {
        messageEl.innerText = 'Game is ongoing...';
    } else if(winner === false && tie === true) {
        messageEl.innerText = "It's a tie!";
    } else {
        messageEl.innerText = `Player ${turn} wins!`;
    };
};

const render = () => {
    updateBoard();
    updateMessage();
};

const init = () => {
    board = ['','','','','','','','',''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
};
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((squareEl) => {
    squareEl.addEventListener('click',handleClick);
});

resetBtnEl.addEventListener('click',init);
