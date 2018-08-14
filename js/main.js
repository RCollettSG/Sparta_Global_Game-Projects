$(function() {

  var diff;
  var questions;

  //Hide other screens
  $("#questionsScreenP1").hide();
  $("#questionsScreenP2").hide();
  $("#questions1").hide();
  $("#questions2").hide();

  //Get and return the difficulty from the radio buttons
  function getDifficulty() {
    return $('.diffBtns:checked').val();
  }

  //get questions from an API
  function getQuestions(difficulty) {
    switch (difficulty) {
      case "easy":
          $.get("https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple", function(data){
          questions = data;
          return questions;
        })
        break;
      case "medium":
          $.get("https://opentdb.com/api.php?amount=50&category=9&difficulty=medium&type=multiple", function(data){
          questions = data;
          return questions;
        })
        break;
      case "hard":
        $.get("https://opentdb.com/api.php?amount=50&category=9&difficulty=hard&type=multiple", function(data){
          questions = data;
          debugger;
          return questions;
        })
        break;
    }
  }

  //Show the questions
  function showQuestions(ques) {
    var quesNumber = 0;
    var answerBtns = $(".answerBtns");
    var randQues = Math.floor(Math.random() * 50);
    var randBtn = Math.floor(Math.random() * 4) + 1;
    //Display the first question
    $("#question").html(ques.results[randQues].question);
    //Display the correct answer on a random button.
    $("#answer" + randBtn).html(ques.results[randQues].correct_answer).addClass("answer")
    debugger;
    // Do this function every 10 seconds
    var timer = setInterval(function() {
      if (quesNumber == 9) {
        //Stop the timer
        alert("Finished!");
        clearInterval(timer);
      } else {
        quesNumber++
        $(".answerBtns").html("");
        //Create a new random number every time
        randQues = Math.floor(Math.random() * 50);
        randBtn = Math.floor(Math.random() * 4) + 1;
        //Display the question
        $("#question").html(ques.results[randQues].question);
        $("#answer" + randBtn).html(ques.results[randQues].correct_answer).addClass("answer");
      }
    }, 10000);
  }

  //When the user clicks the start button
  $("#startBtn").click(function (){
    diff = getDifficulty();
    questions = getQuestions(diff);
    $("#titleScreen").hide();
    $("#questionsScreenP1").show()
  })
  $("#startQues").click(function(){
    $(this).hide();
    $("#questions1").show();
    showQuestions(questions);
  })
})
