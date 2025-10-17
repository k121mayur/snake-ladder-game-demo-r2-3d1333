let player1, player2;
let currentPlayer;
let playerWins = { player1: 0, player2: 0 };
let playerPositions = { player1: 0, player2: 0 };

document.getElementById('start-game').addEventListener('click', function() {
    player1 = document.getElementById('player1').value || 'Player 1';
    player2 = document.getElementById('player2').value || 'Player 2';
    currentPlayer = 'player1';
    document.getElementById('player-input').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';
    updateScoreboard();
    generateBoard();
});

function generateBoard() {
    const board = document.getElementById('board');
    for (let i = 100; i >= 1; i--) {
        const cell = document.createElement('div');
        cell.innerText = i;
        board.appendChild(cell);
    }
}

document.getElementById('roll-dice').addEventListener('click', function() {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice-result').innerText = 'You rolled a ' + diceRoll;
    moveToken(diceRoll);
});

function moveToken(steps) {
    const currentPosition = playerPositions[currentPlayer];
    const newPosition = currentPosition + steps;
    if (newPosition <= 100) {
        playerPositions[currentPlayer] = newPosition;
        animateToken(currentPlayer, currentPosition, newPosition);
        checkWin();
    }
}

function animateToken(player, from, to) {
    const token = document.createElement('div');
    token.classList.add('token');
    document.getElementById('board').children[100 - from].appendChild(token);
    setTimeout(() => {
        token.style.transform = 'translateY(-' + (to - from) * 50 + 'px)';
    }, 100);
}

function checkWin() {
    if (playerPositions[currentPlayer] === 100) {
        alert(currentPlayer === 'player1' ? player1 + ' wins!' : player2 + ' wins!');
        playerWins[currentPlayer]++;
        updateScoreboard();
        resetGame();
    } else {
        currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
    }
}

function updateScoreboard() {
    document.getElementById('scoreboard').innerText = `${player1}: ${playerWins.player1} wins, ${player2}: ${playerWins.player2} wins`;
}

function resetGame() {
    playerPositions = { player1: 0, player2: 0 };
    document.getElementById('dice-result').innerText = '';
    const tokens = document.querySelectorAll('.token');
    tokens.forEach(token => token.remove());
}