import { quizData } from "./data.js";
// console.log(quizData)

//create copy of questions and sort them randomly
let questions = [...quizData].sort(() => Math.random() - 0.5);
// console.log(questions[1])
let currentQuestion = 0

const questionEle = document.getElementById("questions")
const options = document.getElementById("options")
const nextBtn = document.getElementById("next-btn")
const timer = document.getElementById("timer")
const result= document.getElementById("result")

function loadQuestion(){
  const q = questions[currentQuestion] //holds all the questions data in my quizData
  questionEle.textContent = `Q${currentQuestion + 1}. ${q.question}`
  q.options.forEach((option, index) => {
    const btn = document.createElement("button")
    btn.classList.add("option-btn") // class for styling the options btn
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(index))
    options.appendChild(btn)
  });

  nextBtn.style.display = "none" // Hides next btn. Only shows when user select a question
}


function selectAnswer(index){
  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll(".option-btn")

  buttons.forEach(btn => btn.disabled = true);// once user selects 1 answer, the rest is disabled

  if(index === q.correct){
    // style the correct answer
    buttons[index].classList.add("correct");
  }else{
    // style the wrong answer
    buttons[index].classList.add("wrong");
    //display correct answer again
    buttons[q.correct].classList.add("correct");
  }
  nextBtn.style.display ="inline-block" //next button to display
}


loadQuestion();
