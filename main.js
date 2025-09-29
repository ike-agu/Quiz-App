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
    options.appendChild(btn)
  })
}

loadQuestion();
