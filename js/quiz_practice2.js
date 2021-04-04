var score = 0;
var count = 0;
var  index  = 0;
var totQuestions = Questions.length;
var quiz = document.getElementById('quizContainer');
var que = document.getElementById('questn');
var opt1 = document.getElementById('opt1');
var opt2 = document.getElementById('opt2');
var opt3 = document.getElementById('opt3');
var opt4 = document.getElementById('opt4');
var next = document.getElementById('nextButton');
var checkbtn = document.getElementById('checkbtn');
var checkAns= document.getElementById('check');
var resultContent = document.getElementById("result");
var result_status = document.getElementById("result_status");
var right_ans = document.getElementById("right_ans");

function loadQuestion() {
  var q = Questions[index];
  que.textContent = ( index + 1 ) + "." + q.Question; // q.question from the array of questions
  opt1.textContent = q.option1;
  opt2.textContent = q.option2;
  opt3.textContent = q.option3;
  opt4.textContent = q.option4;
};

function checkAnswer() {
  var q = Questions[index];
  var selectedOption = document.querySelector("input[type=radio]:checked");
  var Answer = selectedOption.value;
  if(Answer == q.answer) {
    check.textContent = 'Right answer';
    check.style.color = 'green';
    checkbtn.disabled = true;
    checkbtn.textContent = 'Disabled';
  }
  else {
    check.textContent = 'Wrong Answer';
    check.style.color = 'red';
    checkbtn.disabled = true;
    checkbtn.textContent = 'Disabled';
  }
  loadQuestion();
}
function loadNextQuestion() {
  var selectedOption = document.querySelector("input[type=radio]:checked");
  if(!selectedOption) {
    alert('Kindly choose an option');
  }
  var Answer = selectedOption.value;
  if(Answer == Questions[index].answer) {
    score += 10;
    count++;
  }
  index++;
  selectedOption.checked = false;
  checkAns.textContent = "";
  checkbtn.disabled = false;
  checkbtn.textContent = "Check Answer";

  if(index == totQuestions - 1) {
    next.textContent = "Finish";
  }
  if(index == totQuestions) {
    quiz.style.display = 'none';
    resultContent.style.display = 'block';
    result_status.textContent = "Your Score : " + score + " out of " +totQuestions*10;
    right_ans.textContent = "Right Answers : " + count +" out of " +totQuestions;
  }
  loadQuestion();
}
loadQuestion();
