
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


//start of game
$(document).on("keydown", function () {

    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    // var userChosenColor = this.id;

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    
    //ans check
    checkAnswer(userClickedPattern.length - 1);

})

function playSound(color) {

    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();

}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}



//answer check
function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");

        $("body").addClass("game-over")
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);


        startOver();
    }

}

function startOver() {

    level = 0;
    gamePattern = [];
    started = false;

}