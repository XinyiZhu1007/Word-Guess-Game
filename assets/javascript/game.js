// $(document).ready(function() {

// array of objects
var mangaArray=[
    {word: "naruto",
    url:"./assets/images/naruto.jpg"},
    {word: "one piece",
    url:"./assets/images/onepiece.png"},
    {word: "haikyuu",
    url:"./assets/images/haikyuu.jpg"},
    {word: "dragon ball",
    url:"./assets/images/dragonball.jpg"},
    {word: "hunterxhunter",
    url:"./assets/images/hunter.jpg"},
    {word: "gintama",
    url:"./assets/images/gintama.jpg"},
    {word: "bleach",
    url:"./assets/images/bleach.jpg"}];

var word="",
    input,
    char,
    totalElement=mangaArray.length, 
    randomNum,
    counter=10,
    rightGuesses=false,
    guessHistory=false,
    winner;

var arrayWord=[],
    arrayWrongLetters=[],
    guessResult=[],
    gameResult=[];



//click, make initial-msg disappear
//and background picking a word from mangaArray for guessing
$('#initial-msg').on("click", function() {
    $(this).hide();

    // randomly choose a word from mangaArray
    randomNum = Math.floor(Math.random() * totalElement);
    word = mangaArray[randomNum].word;
    arrayWord = word;
    
    //display underscores based on the chosen word, 
    //data attribute as the actual character
    for(i=0; i<word.length; i++){
        var hiddenletter = $("<div>");
        hiddenletter.attr("class","letter");
        hiddenletter.attr("data-letter", arrayWord[i]);
        if(arrayWord[i]==" ") {
            hiddenletter.text(" ");
        }
        else if(arrayWord[i]!==" ") {
            hiddenletter.text("_");
        }
        $("#hangman-holder").append(hiddenletter);  
    }
    $("#start-guessing").show();

}); // end of document.click //


//keyup to start guessing, total, 10 guesses
$(document).keyup(function(event) {
    counter=counter-1;
    // console.log("current round # "+counter);

    input = document.getElementById("current-guess");
    input.textContent = event.key;
    char = $("#current-guess").text();

    //check if input char matches any char of the word
    //if so, replace underscore with actural char and display on webpage 
    
    $(".letter").each( function() {
        if($(this).attr("data-letter") == char) {
            $(this).text(char);
            rightGuesses=true; 
        } 
        else if($(this).attr("data-letter") !== char){
            rightGuesses=false;
        };
        guessResult.push(rightGuesses);
    });

    // if the guessed char (key input) has at least one hit
    for(i=0; i<guessResult.length; i++) {
        if (guessResult[i]===true) {
            rightGuesses=true;
        }; 
    };
    // console.log("guessResult array: " + guessResult);
    // console.log("final rightGuesses value: " + rightGuesses);

    //check if the current input has been guessed before
    //if guessed, do not decrement count;
    //if not guessed, add to array of guessed char (arrayWrongLetters)
    findExist(char, arrayWrongLetters);
    
    if (guessHistory==false) {
        arrayWrongLetters.push(char);
        // console.log("guessed char array: " + arrayWrongLetters);
    } else if (guessHistory==true) {
        counter=counter+1;
        // console.log("repeated guess, should increment by 1: "+counter);
    }
    // console.log(counter);
    $("#lifes-remaining").text(counter);
    $("#wrong-chars").text(arrayWrongLetters.join(" "));

    //reset variables to prep for next key input
    rightGuesses=false;
    guessHistory=false;
    guessResult=[];
    // console.log("reset rightGuesses: "+rightGuesses);
    // console.log("reset guessHistory: "+guessHistory);
    // console.log("reset guessResult[]: "+guessResult);

    //at end of each keyup event, check if the player wins
    $(".letter").each( function() {
        if($(this).attr("data-letter") == $(this).text()) {
            winner=true; 
        } 
        else if($(this).attr("data-letter") !== $(this).text()){
            winner=false;
        };
        gameResult.push(winner);
    });

    // console.log("gameResult array: "+gameResult);

    for(i=0; i<gameResult.length; i++) {
        if (gameResult[i]===false) {
            winner=false;
        }; 
    };

    // console.log("final value of winner boolean: "+winner);

    // determines if player wins
    // if wins, display winning msg and pic
    // if loses, display another msg
    if (counter >=0 && winner==true) {
        $("#result").text("You got it!");
        var winPic = $("#winner-pic");
        winPic.attr("src", mangaArray[randomNum].url);
        $("#winner-pic").hide(0).delay(600).show("slow");

    }else if (counter == 0 && winner ==false) {
        $("#result").text("You didn't get it ... \n Better luck next time!");
    };

    winner=null;
    gameResult=[];



});
//end of document.keyup //


//start of function findExist
//action: eval if input has been guessed before

function findExist(letter, array) {
    for(i=0; i< array.length; i++) {
        if (array[i] == letter) {
            guessHistory=true;
            // console.log("function findExist, guessed before: "+guessHistory);
        };
    };
}  // end of function findExist //

