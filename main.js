import { quizData } from "./data.js";
// console.log(quizData)

//create copy of questions and sort them randomly
let questions = [...quizData].sort(() => Math.random() - 0.5);
// console.log(questions[1])
let currentQuestion = 0;
let score = 0; //score variable will be incremented whe user gets the correct answer
let timer; //. timer variable for set interval timer
let timeLeft;


const questionEle = document.getElementById("questions")
const options = document.getElementById("options")
const nextBtn = document.getElementById("next-btn")
const timerEle = document.getElementById("timer")
const result= document.getElementById("result")

function loadQuestion() {

  clearInterval(timer)// clear the interval always, else timer will run forever. Basically it stops the timer
  timeLeft = 10;
  updateTimer();// start the coundown visible in the UI
  timer = setInterval(countdown, 1000);


  const q = questions[currentQuestion] //holds all the questions data in my quizData
  questionEle.textContent = `Q${currentQuestion + 1}. ${q.question}`
  options.innerHTML = "", // this will clear the previous element before new elements are shown

  q.options.forEach((option, index) => {
    const btn = document.createElement("button")
    btn.classList.add("option-btn") // class for styling the options btn
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(index, true))
    options.appendChild(btn)
  });

  nextBtn.style.display = "none" // Hides next btn. Only shows when user select a question
}

//count down function
function countdown(){
  timeLeft-- // reduces time left by 1 each time
  updateTimer(); // this actually shows the timer reducing in the UI
  if(timeLeft === 0){
    clearInterval(timer) // always remember to stop the timer by clearing the interval
    selectAnswer(questions[currentQuestion]?.correct, false )
  }
}

//update timer function
function updateTimer() {
  timerEle.textContent = `⏰ ${timeLeft}`; // time left comes from counddown
}


//select answer function
function selectAnswer(index, shouldScoreByClick){
  clearInterval(timer) // to stop the timer when an answer is selected.
  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll(".option-btn")

  buttons.forEach(btn => btn.disabled = true);// once user selects 1 answer, the rest is disabled

  if(index === q.correct){
    shouldScoreByClick && score++; //if user clicks correct answer, then score increments by 1. when timer selects for us, it does not increment our score
    buttons[index].classList.add("correct"); // style the correct answer
  }else{
    // style the wrong answer
    buttons[index].classList.add("wrong");
    //display correct answer again
    buttons[q.correct].classList.add("correct");
  }
  nextBtn.style.display ="inline-block" //next button to display
}

//Add event listener for the next btn, so that we can move to next question
nextBtn.addEventListener("click", ()=> {
  //increment current question by 1 each time user clicks
  currentQuestion++;
  if(currentQuestion < questions.length){
    //we load the questions again from the below function
    loadQuestion();
  }else{
    //show the result
    showResult()
  }
})


/*
--------------to do in showResult()-----------
- store the highest quiz score in the browser local storage
- every time a user completes the quiz, we will show their score and the previous highest score
- if user score is highest, we will remove previous highest score and store latest highest score in the local storage
*/

//show result function
function showResult(){
  nextBtn.style.display = "none";
  const highScore = localStorage.getItem("quizHighScore") || 0;// if local storage has no value , assign it 0
  const isNew = score > highScore; // highScore is the existing current high score. check If score is higher, if it is, it becomes the current new high score.

  if(isNew){
    localStorage.setItem("quizHighScore", score); // set the new value for the high score in local storage
  }

    //handle results
    result.innerHTML = `
    <h2>Hurray!!! You have completed the quiz</h2>
    <p>You have scored ${score} out of ${questions.length} questions.</p>
    <p>Highest score: ${Math.max(score, highScore)} </p>
    ${isNew ? "<p>Hey, New High Score!</p>" : ""}

    <button onclick="location.reload()">Restart Quiz</button>
    `;
    // <button onclick="location.reload()">Restart Quiz</button>  reloads the entire page to start from fresh
}

loadQuestion();
