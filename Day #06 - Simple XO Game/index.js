var playerTurn, moves, isGameOver, span, restartButton;
playerTurn = "x";
moves = 0;
isGameOver = false;
span = document.getElementsByTagName("span");
restartButton = '<button onclick="playAgain()"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16"><path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/><path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/></svg></button>';

function play(y) {
    if (y.dataset.player == "none" && window.isGameOver == false) {
        y.innerHTML = playerTurn;
        y.dataset.player = playerTurn;
        moves++;
        if (playerTurn == "x") {
            playerTurn = "o";
        } else if (playerTurn == "o") {
            playerTurn = "x";
        }
    }

    /* Win Types */

    checkWinner(1, 2, 3);
    checkWinner(4, 5, 6);
    checkWinner(7, 8, 9);
    checkWinner(1, 4, 7);
    checkWinner(2, 5, 8);
    checkWinner(3, 6, 9);
    checkWinner(1, 5, 9);
    checkWinner(3, 5, 7);

    /* No Winner */

    if (moves == 9 && isGameOver == false) { draw(); }

}

function checkWinner(a, b, c) {
    a--;
    b--;
    c--;
    if ((span[a].dataset.player === span[b].dataset.player) && (span[b].dataset.player === span[c].dataset.player) && (span[a].dataset.player === span[c].dataset.player) && (span[a].dataset.player === "x" || span[a].dataset.player === "o") && isGameOver == false) {
        span[a].parentNode.className += " activeBox";
        span[b].parentNode.className += " activeBox";
        span[c].parentNode.className += " activeBox";
        gameOver(a);
    }
}

function playAgain() {
    document.getElementsByClassName("alert")[0].parentNode.removeChild(document.getElementsByClassName("alert")[0]);
    resetGame();
    window.isGameOver = false;
    for (var k = 0; k < span.length; k++) {
        span[k].parentNode.className = span[k].parentNode.className.replace("activeBox", "");
    }
}

function resetGame() {
    for (i = 0; i < span.length; i++) {
        span[i].dataset.player = "none";
        span[i].innerHTML = "&nbsp;";
    }
    playerTurn = "x";
}

function gameOver(a) {
    var gameOverAlertElement = "<b>GAME OVER </b><br><br> Player " + span[a].dataset.player.toUpperCase() + ' Win !!! <br><br>' + restartButton;
    var div = document.createElement("div");
    div.className = "alert";
    div.innerHTML = gameOverAlertElement;
    document.getElementsByTagName("body")[0].appendChild(div);
    window.isGameOver = true;
    moves = 0;
}

function draw() {
    var drawAlertElement = '<b>DRAW!!!</b><br><br>' + restartButton;
    var div = document.createElement("div");
    div.className = "alert";
    div.innerHTML = drawAlertElement;
    document.getElementsByTagName("body")[0].appendChild(div);
    window.isGameOver = true;
    moves = 0;
}