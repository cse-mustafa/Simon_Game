//Color generation

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keydown(function (){
 
  if(!started){
    $("#level-title").text("Level " + level);

    nextSequence();
    
    started = true;
  }

})

function checkAnswer(currentLevel){
   if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {

    console.log("success");
     if(userClickedPattern.length == gamePattern.length){
      setTimeout(function(){
        nextSequence()
      },1000);

     }
    
   } 
   
   else {
       var audio = new Audio("sounds/wrong.mp3");
       audio.play();

       $("body").addClass("game-over");

       setTimeout(function(){
         $("body").removeClass("game-over");
       },200);

       $("h1").text("Game Over, Press Any Key to Restart");
       
       startOver();
       
    
    
   }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
     
    playSound(randomChosenColour);

};


$(".btn").click( function(){
    // var userChosenColour = $(this).attr("id");
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


function playSound(name) {
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}


function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){
  started = false;
  level = 0;
  gamePattern = [];
}

