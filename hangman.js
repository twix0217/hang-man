/*-------------- Constants -------------*/
const words = {
    animals: ["elephant", "giraffe", "lion", "tiger", "zebra", "kangaroo", "panda", "monkey", "dolphin", "penguin"],
    countries: ["argentina", "brazil", "canada", "denmark", "egypt", "finland", "germany", "hungary", "india", "japan"],
    fruits: ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon"],
    vegetables: ["artichoke", "broccoli", "carrot", "daikon", "eggplant", "fennel", "garlic", "horseradish", "kale", "lettuce"],
    clothes: ["t-shirt", "jeans", "jacket", "sweater", "shorts", "skirt", "dress", "blouse", "trousers", "scarf"],
    sports: ["basketball", "cricket", "football", "gymnastics", "hockey", "judo", "karate", "lacrosse", "rowing", "swimming"]
};

const keyboard = document.querySelector('.keyboard');
const categories = document.querySelectorAll('.categories button');
const playAgain = document.querySelector('.play-again button');

/*---------- Variables (state) ---------*/
let chosenWord = '';
let guessedLetters = [];
let wrongGuesses = 0;
const maxGuesses = 5;
let gameStarted = false;
/*-------------- Functions -------------*/
function startGame(category) {
    gameStarted=true;
    const wordArray = words[category];
    chosenWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    hideParts();
    document.getElementById('guessed-letters-container').innerText = '';
    document.getElementById('message').textContent = '';
    displayWord();
    enableKeyboardButtons();
    console.log(chosenWord);
}

function displayWord() {
    const wordDisplayArray = [];

    for (let i = 0; i < chosenWord.length; i++) {
        if (guessedLetters.includes(chosenWord[i])) {
            wordDisplayArray.push(chosenWord[i]);
        } else {
            wordDisplayArray.push('_');
        }
    }
    console.log(chosenWord);

    const wordDisplay = wordDisplayArray.join(' ');

    document.getElementById('word-display').innerText = wordDisplay;

    if (!wordDisplay.includes('_')) {
        const winmsg = document.getElementById('message');
        winmsg.textContent = 'You Win!';
        winmsg.style.color = 'blue';
        disableKeyboardButtons();
    }
}



function handleGuess(letter, button) {
    if(!gameStarted) return;
    if (!guessedLetters.includes(letter) && wrongGuesses < maxGuesses) {
        guessedLetters.push(letter);
        document.getElementById('guessed-letters-container').textContent = guessedLetters.join(', ');
        if (!chosenWord.includes(letter)) {
            wrongGuesses++;
           showParts(wrongGuesses);
        }
        
        displayWord();
        checkGameOver();

        button.disabled = true;
        button.classList.add('hidden');
    }
}

function showParts(wrongGuesses){
    const parts = ['head','left-arm','right-arm','left-leg','right-leg'];
    if (wrongGuesses>0 && wrongGuesses <=parts.length){
        document.getElementById(parts[wrongGuesses-1]).style.visibility='visible';
    }
}

function hideParts(){
    const parts = ['head','left-arm','right-arm','left-leg','right-leg'];
    parts.forEach(part=>{
        document.getElementById(part).style.visibility = 'hidden';
    })
}

function checkGameOver() {
    if (wrongGuesses >= maxGuesses) {
       const losemsg =  document.getElementById('message');
       losemsg.textContent='You lose! The correct word was ' + chosenWord;
       losemsg.style.color='red'; 
       disableKeyboardButtons();

       document.getElementById('game-over-container').style.display='block';
}
    }

    

function resetGame() {
    gameStarted=false;
    chosenWord = '';
    guessedLetters = [];
    wrongGuesses = 0;
    document.getElementById('guessed-letters-container').innerText = '';
    document.getElementById('word-display').innerText = '';
    document.getElementById('message').textContent = '';
    enableKeyboardButtons();
    hideParts();
    
}

function keyboardButtons() {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    alphabets.forEach(letter => {
        const button = document.createElement('button');
        button.addEventListener('click', () => {
            handleGuess(letter.toLowerCase(), button);
        });
        button.textContent = letter;
        keyboard.appendChild(button);
    });
}

function enableKeyboardButtons() {
    const buttons = keyboard.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = false;
        button.classList.remove('hidden');
    });
}

function disableKeyboardButtons() {
    const buttons = keyboard.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
    });
}

keyboardButtons();

/*----------- Event Listeners ----------*/
categories.forEach(button => {
    button.addEventListener('click', () => {
        resetGame();
        startGame(button.textContent.toLowerCase());
    });
});

playAgain.addEventListener('click', resetGame);
