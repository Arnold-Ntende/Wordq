const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "What does the acronym “WP” stand for from what you have learn't?",
    choice1: "Web Program",
    choice2: "Web Post",
    choice3: "WordPress",
    choice4: "Website Platform",
    answer: 3
  },
  {
    question: "In which year was the first word camp in Uganda?",
    choice1: "2016",
    choice2: "2019",
    choice3: "2017",
    choice4: "<2018",
    answer: 3
  },
  {
    question:
      "Which programming language is WordPress primarily written in?",
    choice1: "Python",
    choice2: "Ruby",
    choice3: "PHP",
    choice4: "Javascript",
    answer: 3
  },
  {
    question: "Which of the following is a popular WordPress page builder plugin?",
    choice1: "Elementor",
    choice2: "WooCommerce",
    choice3: "Yoast SEO",
    choice4: "WPForms",
    answer: 1
  },
  {
    question: "Which file is responsible for the WordPress configuration settings?",
    choice1: "wp-config.php",
    choice2: "functions.php",
    choice3: "index.php",
    choice4: "style.css",
    answer: 1
  }
  
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
