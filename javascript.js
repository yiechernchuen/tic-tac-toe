const gameBoard = (function () {
    let gameArr = ['', '', '', '', '', '', '', '', ''];
    let starterPlayer = document.querySelector('#initiator');
    let gameStarted = false;
    let player1Turn = false;
    let player2Turn = false;
    const gameRun = (e) => {
        const firstRound = () => {
            if (starterPlayer.checked && !gameStarted) {
                e.target.textContent = 'X';
                player2Turn = true;
            }
            if (!starterPlayer.checked && !gameStarted) {
                e.target.textContent = 'O';
                player1Turn = true;
            }
            gameStarted = true;
        };
        const otherRounds = () => {
            if (player1Turn) {
                e.target.textContent = 'X';
                player1Turn = false;
                player2Turn = true;
            } else if (player2Turn) {
                e.target.textContent = 'O';
                player1Turn = true;
                player2Turn = false;
            }
        };
        gameStarted ? otherRounds() : firstRound();
        gameArr[e.target.dataset.index] = e.target.textContent;
    };
    return { gameRun };
})();

const boxes = document.querySelectorAll('.box');
boxes.forEach((box) => {
    box.addEventListener('click', gameBoard.gameRun);
});

//user clicks the box
//depending on which player, it displays the symbol and checks for a 3-in-a-row
//once all boxes have been filled, update the score of the winner
//
