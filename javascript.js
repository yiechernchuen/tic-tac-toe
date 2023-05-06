const game = (function () {
    const gameBoard = document.querySelectorAll('.box');
    const starterPlayer = document.querySelector('#initiator');
    const labelX = document.querySelector('.label');
    const scoreBoard1 = document.querySelector('.score1');
    const scoreBoard2 = document.querySelector('.score2');
    const displayWinner = document.querySelector('.displayWinner');
    const player1Name = document.querySelector('.player1');
    const player2Name = document.querySelector('.player2');
    const startBtn = document.querySelector('.start');
    const resetBtn = document.querySelector('.reset');
    let gameArr = ['', '', '', '', '', '', '', '', ''];
    let player1Score = 0;
    let player2Score = 0;
    let gameStarted = false;
    let player1Turn = false;
    let player2Turn = false;
    const gameRun = (e) => {
        const firstRound = () => {
            if (starterPlayer.checked && !gameStarted) {
                e.target.textContent = 'X';
                e.target.removeEventListener('click', gameRun);
                player2Turn = true;
            }
            if (!starterPlayer.checked && !gameStarted) {
                e.target.textContent = 'O';
                e.target.removeEventListener('click', gameRun);
                player1Turn = true;
            }
            gameStarted = true;
        };
        const otherRounds = () => {
            if (player1Turn) {
                e.target.textContent = 'X';
                e.target.removeEventListener('click', gameRun);
                player1Turn = false;
                player2Turn = true;
            } else if (player2Turn) {
                e.target.textContent = 'O';
                e.target.removeEventListener('click', gameRun);
                player1Turn = true;
                player2Turn = false;
            }
        };
        gameStarted ? otherRounds() : firstRound();
        gameArr[e.target.dataset.index] = e.target.textContent;
        checkWinner();
    };
    const checkWinner = () => {
        if (
            (gameArr[0] === 'X' && gameArr[1] === 'X' && gameArr[2] === 'X') ||
            (gameArr[3] === 'X' && gameArr[4] === 'X' && gameArr[5] === 'X') ||
            (gameArr[6] === 'X' && gameArr[7] === 'X' && gameArr[8] === 'X') ||
            (gameArr[0] === 'X' && gameArr[3] === 'X' && gameArr[6] === 'X') ||
            (gameArr[1] === 'X' && gameArr[4] === 'X' && gameArr[7] === 'X') ||
            (gameArr[2] === 'X' && gameArr[5] === 'X' && gameArr[8] === 'X') ||
            (gameArr[0] === 'X' && gameArr[4] === 'X' && gameArr[8] === 'X') ||
            (gameArr[2] === 'X' && gameArr[4] === 'X' && gameArr[6] === 'X')
        ) {
            player1Score++;
            scoreBoard1.textContent = player1Score;
            displayWinner.textContent = `${player1Name.value} Wins!`;
            gameBoard.forEach((box) => {
                box.removeEventListener('click', gameRun);
            });
        }
        if (
            (gameArr[0] === 'O' && gameArr[1] === 'O' && gameArr[2] === 'O') ||
            (gameArr[3] === 'O' && gameArr[4] === 'O' && gameArr[5] === 'O') ||
            (gameArr[6] === 'O' && gameArr[7] === 'O' && gameArr[8] === 'O') ||
            (gameArr[0] === 'O' && gameArr[3] === 'O' && gameArr[6] === 'O') ||
            (gameArr[1] === 'O' && gameArr[4] === 'O' && gameArr[7] === 'O') ||
            (gameArr[2] === 'O' && gameArr[5] === 'O' && gameArr[8] === 'O') ||
            (gameArr[0] === 'O' && gameArr[4] === 'O' && gameArr[8] === 'O') ||
            (gameArr[2] === 'O' && gameArr[4] === 'O' && gameArr[6] === 'O')
        ) {
            player2Score++;
            scoreBoard2.textContent = player2Score;
            displayWinner.textContent = `${player2Name.value} Wins!`;
            gameBoard.forEach((box) => {
                box.removeEventListener('click', gameRun);
            });
        }
    };

    const start = () => {
        gameArr = ['', '', '', '', '', '', '', '', ''];
        gameBoard.forEach((box) => {
            box.textContent = '';
            box.addEventListener('click', gameRun);
        });
        displayWinner.textContent = '';
        gameStarted = false;
        player1Turn = false;
        player2Turn = false;
    };

    const reset = () => {
        gameArr = ['', '', '', '', '', '', '', '', ''];
        gameBoard.forEach((box) => {
            box.textContent = '';
            box.addEventListener('click', gameRun);
        });
        displayWinner.textContent = '';
        player1Score = 0;
        player2Score = 0;
        scoreBoard1.textContent = player1Score;
        scoreBoard2.textContent = player2Score;
        player1Name.value = 'Player X';
        player2Name.value = 'Player O';
        labelX.textContent = 'Player X initiates:';
        starterPlayer.checked = false;
        gameStarted = false;
        player1Turn = false;
        player2Turn = false;
    };
    return { gameBoard, startBtn, resetBtn, labelX, player1Name, gameRun, start, reset };
})();

game.gameBoard.forEach((box) => {
    box.addEventListener('click', game.gameRun);
});
game.startBtn.addEventListener('click', game.start);
game.resetBtn.addEventListener('click', game.reset);
game.player1Name.addEventListener('change', (e) => {
    game.labelX.textContent = `${e.target.value} initiates:`;
});
