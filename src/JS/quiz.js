// Fetching data from JSON file
fetch('src/JS/index.json')
.then((response)=>{
  return response.json();
}).then((data)=>{
  legendQuestions = data.legendQuestions;
  nationalQuestions = data.nationalQuestions;
  mixedQuestions = data.mixedQuestions;
})

// selecting elements
let legendQuestions, nationalQuestions, mixedQuestions;
const typeBtnElements = document.querySelectorAll(".type-btn");
const questionElementContainer = document.getElementById("question-container");
const pageImg = document.getElementById("quiz-img");
const typeBtnContainer = document.getElementById("type-container");
const questionElement = document.getElementById("question");
const answerElementContainer = document.getElementById("answer-container");
const main = document.getElementById("main");
const questionNumber = document.getElementById("questionNumber");

// for displaying the score
const scoreBox = document.getElementById("scorebox");
let score = 0;

// important buttons
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

// popup elements
const popup = document.getElementById("popup");
const popupScore = document.getElementById("popup-score");

// exit btn
const exitBtn = document.getElementById("exit-btn");



typeBtnElements.forEach((btn) => {
  btn.addEventListener("click", startGame);
});

function resetBodyClass(){
  body.className = '';
}
restartBtn.classList.add("hide");
popup.classList.add("hide");

let selectedCategory = "";

function startGame(e) {
  questionElementContainer.classList.remove("hide");
  pageImg.classList.add("hide");
  startH1.classList.add("hide");
  typeBtnElements.forEach((btn) => {
    btn.classList.add("hide");
  });
  exitBtn.classList.remove("hide");
  

  const clickedElement = e.target;

  if (clickedElement.classList.contains("legends")) {
    clickedElement.dataset.legend = true;
  } else if (clickedElement.classList.contains("national")) {
    clickedElement.dataset.national = true;
  } else if (clickedElement.classList.contains("mixed")) {
    clickedElement.dataset.mixed = true;
  }

  questionIndex = 0;
  checkNextQuestion(clickedElement, questionIndex);
}

function checkNextQuestion(Element, questionIndex) {
  if (Element.dataset.legend) {
    setNextQuestion(legendQuestions[questionIndex]);
    selectedCategory = "legend";
  } else if (Element.dataset.national) {
    selectedCategory = "national";
    setNextQuestion(nationalQuestions[questionIndex]);
  } else if (Element.dataset.mixed) {
    selectedCategory = "mixed";
    setNextQuestion(mixedQuestions[questionIndex]);
  }
}

function setNextQuestion(questionArray) {
  resetState();
  questionNumber.innerText = `${questionIndex+1}/${legendQuestions.length}`;
  questionElement.textContent = questionArray.question;

  questionArray.answers.forEach((answer) => {
    let btn = document.createElement("button");
    btn.classList.add("btn");
    btn.innerText = answer.text;
    answerElementContainer.appendChild(btn);
    
    if(answer.correct){
      btn.classList.add("true");
    }else{
      btn.classList.add("false");
    }

    btn.addEventListener("click", checkAnswer);
  });
}

function resetState() {
  while (answerElementContainer.firstElementChild) {
    answerElementContainer.removeChild(
      answerElementContainer.firstElementChild
    );
  }
}

let scoreCelebration = document.createElement("div");

function checkAnswer(e) {
  let clickedElement = e.target;
  
  if (clickedElement.classList.contains("true")) {
    clickedElement.classList.add("correct");

    score += 100;  
    scoreCelebration.classList.remove("score-hide");
    scoreCelebration.classList.add("scoreCeleb");

    setTimeout(()=>{
      scoreCelebration.classList.add('score-hide');
    },200)

    scoreCelebration.innerHTML = `+100`
    main.appendChild(scoreCelebration);

    clickedElement.removeEventListener('click',checkAnswer);

    popupScore.innerText = `Amazing, Your score is ${score} points`;
    scoreBox.innerHTML = `Score : ${score} Points` 

    document.body.classList.add("correct");
    
  }else{
    if(clickedElement.classList.contains('false')){
      clickedElement.removeEventListener("click",checkAnswer);
      let answerArr = Array.from(answerElementContainer.children);
      answerArr.forEach(btn =>{
        if(btn.classList.contains('true')){
          btn.classList.add("correct");
          btn.removeEventListener('click',checkAnswer)
        }
      })
    }
    clickedElement.classList.add("wrong");
    document.body.classList.add("wrong");
  }
  nextBtn.classList.remove("hide");
}

function resetScore(){
  score = 0;
  scoreBox.innerHTML = `Score: ${score} Points`;
  popupScore.innerText=''
}

nextBtn.addEventListener("click", nextBtnFunc);

function nextBtnFunc() {
  questionIndex++;
  nextBtn.classList.add("hide");
  resetBodyClass();

  if (selectedCategory === "legend") {
    checkLength(legendQuestions,questionIndex);
  } else if (selectedCategory === "national") {
    checkLength(nationalQuestions,questionIndex);
  } else if (selectedCategory === "mixed") {
    checkLength(mixedQuestions,questionIndex);
  }
}

function resetBodyClass(){
  body.className = '';
}

function checkLength(questions , questionIndex){
  if (questions.length > questionIndex) {
    setNextQuestion(questions[questionIndex]);
  } else {
    popup.classList.remove('hide')
    
    setTimeout(()=>{
      popup.classList.add('hide')
    },2500)

    nextBtn.classList.add("hide");
    restartBtn.classList.remove("hide");
  }
}

exitBtn.addEventListener('click', ()=>{
  resetBodyClass();
  nextBtn.classList.add("hide");
  backFunc();
})

function backFunc(){
  questionElementContainer.classList.add("hide");
  pageImg.classList.remove("hide");
  startH1.classList.remove("hide");
  typeBtnElements.forEach((btn) => {
    btn.classList.remove("hide");
  });
  popup.classList.add("hide");
  restartBtn.classList.add("hide");
  exitBtn.classList.add("hide");
  resetScore();
}


restartBtn.addEventListener("click",restartBtnFunc) 

function restartBtnFunc() {
  questionIndex = 0;
  if (selectedCategory == "legend") {
    setNextQuestion(legendQuestions[questionIndex]);
  }else if(selectedCategory == "national"){
    setNextQuestion(nationalQuestions[questionIndex]);
  }else if(selectedCategory == "mixed"){
    setNextQuestion(mixedQuestions[questionIndex]);
  }
  resetScore();
  restartBtn.classList.add("hide");
};
