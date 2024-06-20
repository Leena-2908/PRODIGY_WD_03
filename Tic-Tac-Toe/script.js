let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let gameMode = 'human'; // 'human' or 'ai'

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const cellElements = document.getElementsByClassName('cell');

const cellClick = (index) => {
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        cellElements[index].innerText = currentPlayer;
        cellElements[index].classList.add('occupied');
        if (checkWin()) {
            endGame(`Player ${currentPlayer} wins!`);
        } else if (checkDraw()) {
            endGame('Draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (gameMode === 'ai' && currentPlayer === 'O') {
                setTimeout(() => makeAIMove(), 500); // Delay for AI move
            }
            updateStatus(`Player ${currentPlayer}'s turn`);
        }
    }
};

const makeAIMove = () => {
    let emptyCells = board.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);

    let aiMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[aiMove] = currentPlayer;
    cellElements[aiMove].innerText = currentPlayer;
    cellElements[aiMove].classList.add('occupied');

    if (checkWin()) {
        endGame(`Player ${currentPlayer} wins!`);
    } else if (checkDraw()) {
        endGame('Draw!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus(`Player ${currentPlayer}'s turn`);
    }
};

const checkWin = () => {
    for (let combo of winningCombinations) {
        if (board[combo[0]] !== '' && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
            // Add line-over effect to winning cells
            cellElements[combo[0]].classList.add('winning-cell');
            cellElements[combo[1]].classList.add('winning-cell');
            cellElements[combo[2]].classList.add('winning-cell');
            return true;
        }
    }
    return false;
};

const checkDraw = () => {
    return !board.includes('');
};

const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    updateStatus(`Player ${currentPlayer}'s turn`);
    for (let cell of cellElements) {
        cell.innerText = '';
        cell.classList.remove('occupied', 'winning-cell');
    }
};

const updateStatus = (message) => {
    document.getElementById('status').innerText = message;
};

const endGame = (message) => {
    updateStatus(message);
    gameActive = false;
    // Add celebration gesture
    document.getElementById('board').classList.add('game-over');
};

const toggleMode = () => {
    gameMode = gameMode === 'human' ? 'ai' : 'human';
    resetBoard();
    updateStatus(`Player ${currentPlayer}'s turn`);
};
