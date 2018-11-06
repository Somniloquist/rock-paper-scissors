
    const rps = ["rock", "paper", "scissors"];

    function getRandInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    function computerPlay() { {}
        return rps[getRandInt(3)];
    } 

    function playRound(playerSelection, compSelection) {
        if(playerSelection === compSelection) {
            return "draw.";
        } else if(
            playerSelection === "rock" && compSelection === "scissors" ||
            playerSelection === "paper" && compSelection === "rock" ||
            playerSelection === "scissors" && compSelection === "paper"
            ) {
            return `you win! ${playerSelection} beats ${compSelection}.`;
        } else {
            return `you lose. ${compSelection} beats ${playerSelection}.`;
        }
    }

    function showResults(draws, wins, loses) {
        if(draws > wins && draws > loses) {
            console.log("Game over, it was a draw.");
        } else if(wins > loses) {
            console.log("You win!");
        } else {
            console.log("You lose.");
        }
    }

    function game() {
        let drawCount = 0;
        let winCount = 0;
        let loseCount = 0;

        btns = document.querySelectorAll('.btn');
        btns.forEach(btn => btn.addEventListener('click', function(e) {
            const compSelection = computerPlay();
            const playerSelection = this.id;
            const result = playRound(playerSelection, compSelection);

            if(result.includes("draw")) {
                drawCount++;
            } else if(result.includes("win")) {
                winCount++;
            } else {
                loseCount++;
            }

            scoreBoard = document.querySelector('#scoreboard');
            scoreBoard.classList.add('scoreboard');
            roundResults = document.querySelector('#result');
            roundResults.textContent = result;
            score = document.querySelector('#score');
            score.textContent = `you: ${winCount} computer: ${loseCount} draw: ${drawCount}`;

            if (winCount >= 5 || loseCount >= 5) {
                btns.forEach(btn => btn.disabled = true);

                //create buttont o reset the game
                resetBtn = document.createElement('button');
                resetBtn.textContent = 'Reset'
                resetBtn.classList.toggle('btn');
                resetBtn.classList.toggle('btn-reset');
                scoreBoard.appendChild(resetBtn);

                // allow the player to restart the game
                resetBtn.addEventListener('click', function(e) {
                    // reset scoreboard
                    drawCount = 0;
                    winCount = 0;
                    loseCount = 0;
                    roundResults.textContent = '';
                    score.textContent = '';
                    // remove self
                    scoreBoard.removeChild(resetBtn);
                    scoreBoard.classList.toggle('scoreboard');
                    // enable rps buttons
                    btns.forEach(btn => btn.disabled = false);
                });
            }
        }));
    }
    game();
    