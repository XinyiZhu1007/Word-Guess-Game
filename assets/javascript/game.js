// $(document).ready(function() {

// array of objects
var mangaArray=[
    {word: "naruto",
    url:"",
    img:""},
    {word: "one piece",
    url:"",
    img:""},
    {word: "haikyuu",
    url:"",
    img:""},
    {word: "dragon ball",
    url:"",
    img:""},
    {word: "hunterxhunter",
    url:"",
    img:""},
    {word: "gintama",
    url:"",
    img:""},
    {word: "bleach",
    url:"",
    img:""}];

var word="",
    input,
    char,
    totalElement=mangaArray.length, 
    randomNum,
    counter=0;

var arrayWord=[],
    arrayWrongLetters=[];

//press anykey, make initial-msg disappear
//and background picking a word from mangaArray for guessing
$('body').one("keyup", function() {
    $("#initial-msg").hide();

    // randomly choose a word from mangaArray
    randomNum = Math.floor(Math.random() * totalElement);
    word = mangaArray[randomNum].word;
    arrayWord = word;

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

});
for (counter=0; counter<10; counter++) {
    input = document.getElementById("current-guess");
    document.onkeyup = function(event) {
        input.textContent = event.key;
        char = $("#current-guess").text();
        $('.letter[data-letter=char]').text($(this).attr("data-letter"));

        // $('[data-test="the_exact_value"]')
        if($(".letter").text()==char){
            $(".letter").text($(this).attr("data-letter"));
        }
        else{
            for(j=0; j<arrayWrongLetters.length; j++) {
                if(char == arrayWrongLetters[j]) {
                    counter--;
                }
                else {
                    arrayWrongLetters.push(char);
                }
            }
        }
    };
    

    // $("#current-guess").keyup(function(event) {
    //     char=$("#current-guess").val();
    //     $("#current-guess").text(char);
    //     console.log(char);
    // });
}












// })

// var userText = document.getElementById("user-type");

//       // Next, we give JavaScript a function to execute when onkeyup event fires.
//       document.onkeyup = function(event) {
//         userText.textContent = event.key;


// })










// function to generate random number
// function number()




// mangaArray[i].word