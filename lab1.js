const readline = require('readline');

// Create interface to read/write
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Selects a random option for the computer
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max + 1));
}

// Valid options
const validOptions = ['rock', 'paper', 'scissors'];

//Keep score
let playerScore = 0;
let computerScore = 0;
let ties = 0;

const rpsGame = async () => {

  let choice = "";

  rl.question(
    `\nPick one of the following options:\n\nRock\nPaper\nScissors\n`,
     userChoice => {
         let validChoice = false;
         choice = userChoice.toLowerCase();
         if(validChoice == false && validOptions.includes(choice)){
             validChoice = true;
         }else{
             validChoice = false;
         }

    const computerChoice = validOptions[getRandomInt(2)];

    if(validChoice == true){
        //Tie logic
        if (choice === computerChoice) {
            console.log('There was a tie, please go again.');
            ties += 1;
            rpsGame();
        } else if (
            //User wins logic
            (choice === 'rock' && computerChoice === 'scissors') || // Rock beats Scissors
            (choice === 'scissors' && computerChoice === 'paper') || // Scissors beats Paper
            (choice === 'paper' && computerChoice === 'rock')) // Paper beats Rock
        {
            console.log(`The player won.`);
            playerScore += 1;
        } else {
            console.log('The computer won.');
            computerScore += 1;
        }
        console.log(`Player chose ${choice}, Computer Chose ${computerChoice}.`);
        
        const replay = async () => {
            rl.question(
                //prompt user to play again
                `Play again? (y/n)\n`, 
                userAnswer => {
                    let validAnswer = false;
                    const answer = userAnswer.toLowerCase();
                    if(validAnswer == false && answer.includes("y") || answer.includes("n")){
                        validAnswer = true;
                    }else{
                        validAnswer = false;
                    }
                    if(validAnswer){
                        if(answer == "y"){
                            rpsGame();
                        }else{
                            rl.close();
                            console.log("\nEnd of game. Thanks for playing.")
                            console.log("Score board")
                            console.log(`Player: ${playerScore} Computer: ${computerScore} Ties: ${ties}`)
                        }
                    }else{
                        console.log("Invalid option.");
                        replay();
                    }
                }
            );
        }
        replay();
    }else {
        console.log("Invalid option.");
        rpsGame();
    }
})}

rpsGame();