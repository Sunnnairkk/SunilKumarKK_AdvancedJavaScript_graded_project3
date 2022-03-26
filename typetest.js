// define the time limit
let TIME_LIMIT = 60;

// define quotes to be used
let quotes_array = [
    "Nothing can dim the light that shines from within.",
    "Push yourself, because no one else is going to do it for you.",
    "What you get by achieving your goals is not as important as what you become by achieving the goals.",
    "Failure is the condiment that gives success its flavor.",
    "Why to live an ordinary life when you can live an extra ordinary one.",
    "Wake up with determination. Go to bed with satisfaction.",
    "You can't change what has already happened so don't waste time thinking about it. Move on, let go and get over it.",
    "It's going to be hard, but hard does not mean impossible.",
    "The best view comes after the hardest climb.",
    "Learning never exhausts the mind.",
    "Anger is a punishment we give ourselves for someone's mistake.",
    "The only way to do great work is to love what you do.",
    "At the end of the day I am thankful that my blessings are bigger than my problems.",
    "Worrying is stupid, it's like walking around with an umbrella and waiting for it to rain.",
    "All our dreams can come true if we have the courage to pursue them.",
    "If you change your mindset, you have the ability to change your whole world.",
    "Adopting the right attitude can convert a negative stress into a positive one.",
    "Dreams don't work unless you do.",
    "Do more than just exist.",
    "Chase excellence, success will come right behind it."
];

// selecting required elements
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = Math.floor(Math.random() * 20); //Randomly display the first quote.
let timer = null;
let wordsTyped = 0;
let typed = [];

function updateQuote() {
    quote_text.textContent = null;
    current_quote = quotes_array[quoteNo];

    console.log(`${quoteNo} : ${current_quote}`);

    // separate each character and make an element
    // out of each of them to individually style them
    current_quote.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        quote_text.appendChild(charSpan)
    })

    // roll over to the first quote
    if (quoteNo < quotes_array.length - 1)
        quoteNo++;
    else
        quoteNo = 0;
}

function processCurrentText() {

    // get current input text and split it
    curr_input = input_area.value;
    curr_input_array = curr_input.split('');

    // increment total characters typed
    characterTyped++;

    errors = 0;

    quoteSpanArray = quote_text.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {
        let typedChar = curr_input_array[index]

        // character not currently typed
        if (typedChar == null) {
            char.classList.remove('correct_char');
            char.classList.remove('incorrect_char');

        // correct character
        } else if (typedChar === char.innerText) {
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');
        } else {
            char.classList.add('incorrect_char');
            char.classList.remove('correct_char');

            // increment number of errors
            errors++;
        }
    });

    // display the number of errors
    error_text.textContent = total_errors + errors;

    // update accuracy text
    let correctCharacters = (characterTyped - (total_errors + errors));
    let accuracyVal = ((correctCharacters / characterTyped) * 100);
    accuracy_text.textContent = Math.round(accuracyVal);

    // if current text is completely typed
    // irrespective of errors
    if (curr_input.length == current_quote.length) {
        
        curr_input_array = current_quote.split(' ');
        wordsTyped += curr_input_array.length;
        console.log(wordsTyped);

        updateQuote();

        // update total errors
        total_errors += errors;

        // clear the input area
        input_area.value = "";
    }
}

function startTest() {

    resetValues();
    updateQuote();
    
    // clear old and start a new timer
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}
    
function resetValues() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    characterTyped = 0;
    //quoteNo = 0;
    input_area.disabled = false;
    wordsTyped = 0;
    typed = "";
    
    input_area.value = "";
    quote_text.textContent = 'Click on the area below to start the typing test.';
    accuracy_text.textContent = 100;
    timer_text.textContent = timeLeft + 's';
    error_text.textContent = 0;
    restart_btn.style.display = "none";
    cpm_group.style.display = "none";
    wpm_group.style.display = "none";
}

function updateTimer() {
    if (timeLeft > 0) {
        // decrease the current time left
        timeLeft--;
    
        // increase the time elapsed
        timeElapsed++;
    
        // update the timer text
        timer_text.textContent = timeLeft + "s";
    }
    else {
        // finish the game
        finishGame();
    }
}

async function finishGame() {
    // stop the timer
    clearInterval(timer);

    curr_input_array = input_area.value.split(' ');
    wordsTyped += curr_input_array.length;

    // disable the input area
    input_area.disabled = true;
    
    // show finishing text
    quote_text.textContent = "Click on START for a new test.";
    
    // display restart button
    restart_btn.style.display = "block";
    
    // calculate cpm and wpm  //Math.round((((characterTyped / 5) / timeElapsed) * 60));
    cpm = Math.round(((characterTyped / timeElapsed) * 60));
    wpm = wordsTyped-1; 
    
    
    // update cpm and wpm text
    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm; 
    
    // display the cpm and wpm
    cpm_group.style.display = "block";
    wpm_group.style.display = "block";
}

