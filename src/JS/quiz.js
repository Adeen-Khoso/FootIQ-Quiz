// selecting elements
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
const legendQuestions = [
  {
    question: "Which of these player scored the Hand Of God goal ?",
    answers: [
      { text: "Lionel Messi", correct: false },
      { text: "Ronaldo Nazario", correct: false },
      { text: "Ronaldinho", correct: false },
      { text: "Diego Maradona", correct: true },
    ],
  },
  {
    question: "Which of these player is called The King in football ?",
    answers: [
      { text: "Pele", correct: true },
      { text: "Diego Maradona", correct: false },
      { text: "Ronaldo Nazario", correct: false },
      { text: "Ronaldinho", correct: false },
    ],
  },
  {
    question: "Which of these player has 3 worldcups ?",
    answers: [
      { text: "Diego Maradona", correct: false },
      { text: "Ronaldo Nazario", correct: false },
      { text: "Pele", correct: true },
      { text: "Lionel Messi", correct: false },
    ],
  },
  {
    question: "Which of these player has never won a worldcup ?",
    answers: [
      { text: "Cr. Ronaldo", correct: true },
      { text: "Ronaldo Nazario", correct: false },
      { text: "Ronaldinho", correct: false },
      { text: "Lionel Messi", correct: false },
    ],
  },
  {
    question: "Which of these players has most Golden Boots in history of Football ?",
    answers: [
      { text: "Mo Salah", correct: false },
      { text: "Cr. Ronaldo", correct: false },
      { text: "Lionel Messi", correct: true },
      { text: "Ronaldo Nazario", correct: false },
    ],
  },
  {
    question: "Which footballer is often referred to as 'The Egyptian King' ?",
    answers: [
      { text: "Ronaldo Nazario", correct: false },
      { text: "Cr Ronaldo", correct: false },
      { text: "Mo Salah", correct: true },
      { text: "Lionel Messi", correct: false },
    ],
  },
  {
    question: "Which football Manager is referred to as 'The Special One'?",
    answers: [
      { text: "Pep Guardiola", correct: false },
      { text: "Jose Mourinho", correct: true },
      { text: "Alex Ferguson", correct: false },
      { text: "Zidane", correct: false },
    ],
  },
  {
    question: "Who is nicknamed 'O Fenômeno'?",
    answers: [
      { text: "Ronaldinho", correct: false },
      { text: "Zidane", correct: false },
      { text: "Ronaldo Nazario", correct: true },
      { text: "Lionel Messi", correct: false },
    ],
  },
  {
    question: "Who is known as 'The King of Rome'?",
    answers: [
      { text: "Pep Guardiola", correct: false },
      { text: "Francesco Totti", correct: true },
      { text: "Roberto Baggio", correct: false },
      { text: "Zidane", correct: false },
    ],
  },
  {
    question: "Who is known as 'The White Pelé'?",
    answers: [
      { text: "Lionel Messi", correct: false },
      { text: "Di Stefano", correct: true },
      { text: "Pep Guardiola", correct: false },
      { text: "Zidane", correct: false },
    ],
  },
];

const nationalQuestions = [
  {
    question: "Which Player has scored a Goal in every round of Worldcup ?",
    answers: [
      { text: "Pele", correct: false },
      { text: "Luka Modric", correct: false },
      { text: "Kylian Mbappe", correct: false },
      { text: "Lionel Messi", correct: true },
    ],
  },
  {
    question: "Which of these player won the Golden ball in 2018 Worldcup ?",
    answers: [
      { text: "Cr. Ronaldo", correct: false },
      { text: "Luka Modric", correct: true },
      { text: "Mbappe", correct: false },
      { text: "Lionel Messi", correct: false },
    ],
  },
  {
    question: "Which team won the 2010 Worldcup ?",
    answers: [
      { text: "Croatia", correct: false },
      { text: "Spain", correct:true },
      { text: "Portugal", correct: false },
      { text: "France", correct: false },
    ],
  },
  {
    question: "Which team won the 2018 Worldcup ?",
    answers: [
      { text: "Spain", correct: false },
      { text: "Croatia", correct: false },
      { text: "France", correct: true },
      { text: "Portugal", correct: false },
    ],
  },
  {
    question: "Which team has most Worldcups?",
    answers: [
      { text: "Spain", correct: false },
      { text: "Croatia", correct: false },
      { text: "Brazil", correct: true },
      { text: "France", correct: false },
    ],
  },
  {
    question: "Who is the top scorer for France national team ?",
    answers: [
      { text: "Benzema", correct: false },
      { text: "Thiery Henry", correct: false },
      { text: "Mbappe", correct: false },
      { text: "O.Giroud", correct: true },
    ],
  },
  {
    question: "Which is top scorer for Brazil national team ?",
    answers: [
      { text: "Pele", correct: false },
      { text: "Ronaldo", correct: false },
      { text: "Neymar", correct: true },
      { text: "Rivaldo", correct: false },
    ],
  },
  {
    question: "Which is top scorer for Spain national team ?",
    answers: [
      { text: "David Villa", correct: true },
      { text: "Gavi", correct: false },
      { text: "Xavi", correct: false },
      { text: "Morata", correct: false },
    ],
  },
  {
    question: "Which of these players has the most Wc Golden Balls ?",
    answers: [
      { text: "Maradona", correct: false },
      { text: "Lionel Messi", correct: true },
      { text: "Luka Modric", correct: false },
      { text: "Deigo Forlan", correct: false },
    ],
  },
  {
    question: "Which of these players is Top scorer for Argentina National Team ?",
    answers: [
      { text: "Maradona", correct: false },
      { text: "Higuain", correct: false },
      { text: "Lionel Messi", correct: true },
      { text: "Angel Di Maria", correct: false },
    ],
  },
];

const mixedQuestions = [
  {
    question: "Which player has the most goals across top 5 leagues?",
    answers: [
      { text: "Cr. Ronaldo", correct: false },
      { text: "Lionel Messi", correct: true },
      { text: "David Beckham", correct: false },
      { text: "Maradona", correct: false },
    ],
  },
  {
    question: "Which player has the more golden boots between them ? ",
    answers: [
      { text: "Lionel Messi ", correct: true },
      { text: "Neymar Jr", correct: false },
      { text: "Neymar Jr", correct: false },
      { text: "Cr. Ronaldo", correct: false },
    ],
  },
  {
    question: "Which player has the most dribbles ever? ",
    answers: [
      { text: "Neymar Jr", correct: false },
      { text: "Eden Hazard", correct: false },
      { text: "Lionel Messi ", correct: true },
      { text: "Cr. Ronaldo", correct: false },
    ],
  },
  {
    question: "Which player has the most Instagram Followers? ",
    answers: [
      { text: "Lionel Messi ", correct: false },
      { text: "Neymar Jr", correct: false },
      { text: "Cr. Ronaldo", correct: true },
      { text: "Eden Hazard", correct: false },
    ],
  },
  {
    question: "Which player has scored more penalties between them ? ",
    answers: [
      { text: "Kylian Mbappe", correct: false },
      { text: "Lionel Messi ", correct: false },
      { text: "R. Lewandowski", correct: false },
      { text: "Cr. Ronaldo", correct: true },
    ],
  },
  {
    question: "Which player has scored Most Goals Ever ? ",
    answers: [
      { text: "Pele", correct: false },
      { text: "Cr. Ronaldo", correct: true },
      { text: "Lionel Messi ", correct: false },
      { text: "Maradona", correct: false },
    ],
  },
  {
    question: "Which player has scored more Freekicks ? ",
    answers: [
      { text: "David Beckham", correct: false },
      { text: "Lionel Messi ", correct: true },
      { text: "Pele", correct: false },
      { text: "Cr. Ronaldo", correct: false },
    ],
  },
  {
    question: "Which player has the most Trophies in Football History ? ",
    answers: [
      { text: "Cr. Ronaldo", correct: false },
      { text: "Ronaldinho", correct: false },
      { text: "Pele", correct: false },
      { text: "Lionel Messi ", correct: true },
    ],
  },
  {
    question: "Which player has the most indiviual awards in football history ? ",
    answers: [
      { text: "Lionel Messi ", correct: true },
      { text: "Cr. Ronaldo", correct: false },
      { text: "Mo Salah", correct: false },
      { text: "Di Stefano", correct: false },
    ],
  },
  {
    question: "Which player is called Mr UCL ? ",
    answers: [
      { text: "Mo Salah", correct: false },
      { text: "Lionel Messi ", correct: false },
      { text: "Totti", correct: false },
      { text: "Cr. Ronaldo", correct: true},
    ],
  },
  {
    question: "Which player has more Hatricks without Penalties? ",
    answers: [
      { text: "Mo Salah", correct: false },
      { text: "Neymar", correct: false },
      { text: "Lionel Messi ", correct: true },
      { text: "Cr. Ronaldo", correct: false},
    ],
  },
];
