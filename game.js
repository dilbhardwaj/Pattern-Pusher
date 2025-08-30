var userClickedPattern=[];
var gamePattern=[];
var level=0;
var started=false;
var buttonColours=["red", "blue", "green", "yellow"];
function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var sound=new Audio(randomChosenColour+".mp3");
    sound.play();


}


$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    var sound=new Audio(userChosenColour+".mp3");
    sound.play();
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");

    },100);
}
$(document).keydown(function(){

    if(!started){
        $("#level-title").text("Level " + level);

        nextSequence();
        started=true;
    }
}
);
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("Success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("wrong");
        var soundWrong=new Audio("wrong.mp3");
    soundWrong.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");

    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();    
}

}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}

