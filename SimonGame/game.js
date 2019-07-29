var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keypress(function (event) {
    if (event.which == 65) {
        if (!started) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    }
});


$(".btn").click(function () {

    if (started) {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);


    }
})

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").html("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)

}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(userChosenColour) {
    $("#" + userChosenColour).addClass("pressed");
    setTimeout(() => {
        $("#" + userChosenColour).removeClass("pressed");

    }, 100);
}


function checkAnswer(params) {

    if (gamePattern[params] === userClickedPattern[params]) {
        console.log("succes");
        console.log("Game Pattern: " + gamePattern);
        console.log("UserClicked: " + userClickedPattern);

        if (gamePattern.length === userClickedPattern.length) {

            setTimeout(() => {
                nextSequence();

            }, 1000);

        }
    } else {
        console.log("wrong");
        $('body').addClass("game-over");
        $('h1').text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        startOver();    
        $(document).keypress(function (event) {
                if (!started) {
                    $("#level-title").text("Level " + level);
                    nextSequence();
                    started = true;
                }
        });

        setTimeout(() => {
            $('body').removeClass("game-over");

        }, 200);
    }

}

function startOver(){

    started = false;
    level=0;
    gamePattern = [];

}