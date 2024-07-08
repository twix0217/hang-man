/*-------------- Constants -------------*/
const words = {
    animals: ["elephant", "giraffe", "lion", "tiger", "zebra", "kangaroo", "panda", "monkey", "dolphin", "penguin"],
    countries: ["argentina", "brazil", "canada", "denmark", "egypt", "finland", "germany", "hungary", "india", "japan"],
    fruits: ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon"],
    vegetables: ["artichoke", "broccoli", "carrot", "daikon", "eggplant", "fennel", "garlic", "horseradish", "kale", "lettuce"],
    clothes: ["t-shirt", "jeans", "jacket", "sweater", "shorts", "skirt", "dress", "blouse", "trousers", "scarf"],
    sports: ["basketball", "cricket", "football", "gymnastics", "hockey", "judo", "karate", "lacrosse", "rowing", "swimming"]
};

/*---------- Variables (state) ---------*/
/*----- Cached Element References  -----*/
let chosenWord = '';
let guessedLetters = [];
let wrongGuesses = 0;
const maxGuesses = 5;
/*-------------- Functions -------------*/


function startGame(categories){
    const wordArray = words[categories];
    chosenWord = wordArray[Math.floor(Math.random()*wordArray.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    document.getElementById('guessed-letters-container').innerText='';
    document.getElementById('message').textContent='';
    displayWord();
    console.log('Starting game with word: ' + chosenWord);
}

function displayWord(){
    let wordDisplayArray = [];
    for(let i=0;i<chosenWord.length;i++){
        if(guessedLetters.includes(chosenWord[i])){
            wordDisplayArray.push(chosenWord[i]);
        }
        else{
            wordDisplayArray.push('_');
        }
    }
const wordDisplay = wordDisplayArray.join(' ');
document.getElementById('word-display').innerText=wordDisplay;
console.log('Current displayed word: ' + displayWord);

if(wordDisplay.includes('_')){
    document.getElementById('message').textContent='You win'
}
}

function gameOver(){
    if(wrongGuesses>maxGuesses){
        document.getElementById('message').textContent='You lose';
    }
}




/*----------- Event Listeners ----------*/
