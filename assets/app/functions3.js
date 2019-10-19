// select all elements
var start = document.getElementById('start')
var quiz = document.getElementById('quiz')
var question = document.getElementById('show-questions')
var choiceA = document.getElementById('A')
var choiceB = document.getElementById('B')
var choiceC = document.getElementById('C')
var choiceD = document.getElementById('D')
var counter = document.getElementById('counter')
var timeGauge = document.getElementById('timeGauge')
var scoreDiv = document.getElementById('scoreContainer')
var quizInfo = document.getElementById('quiz-info')
var initialBox = document.getElementById('initialBox')
var initialBtn = document.getElementById('initialBtn')
var header = document.getElementById('header')
var displayHigh = document.getElementById('displayHigh')

//audio files
var noLollyGagginAudio = new Audio('assets/app/NO LOLLYGAGGIN .mp3')
var adventurer = new Audio('assets/app/adventurer.mp3')
var levelUp = new Audio('assets/app/levelUp.mp3')

// create some variables
var lastQuestion = questions.length - 1
var currentQ = 0
var count = 0
var timer
var score = 0

//show a question
function showQuestion() {
  var questionsIndex = questions[currentQ]

  question.innerHTML = questionsIndex.question
  choiceA.innerHTML = questionsIndex.choiceA
  choiceB.innerHTML = questionsIndex.choiceB
  choiceC.innerHTML = questionsIndex.choiceC
  choiceD.innerHTML = questionsIndex.choiceD
}

//on click event to start questions, start timer, keep score, show input box
start.addEventListener('click', startQuiz)
initialBtn.addEventListener('click', saveHighScore)

//start the quiz
function startQuiz() {
  quizInfo.style.display = 'none'
  start.style.display = 'none'
  showQuestion()
  quiz.style.display = 'block'
  timer()
}

//check answer function -- if answer == correct score++

function checkAnswer(answer) {
  if (answer == questions[currentQ].correct) {
    levelUp.play()
    score++
  } else {
    //answer is wrong, timer is deducted --alt: answer!= questions[currentQ].correct
    timer -= 5
    noLollyGagginAudio.play()
  }
  if (currentQ < lastQuestion) {
    currentQ++
    showQuestion()
  } else {
    clearInterval(timer)
    finalScore()
  }
}

function timer() {
  timer = 15 * questions.length
  //15 seconds per questions
  var countdown = setInterval(function() {
    timer--
    timeGauge.innerHTML = timer
    if (timer === 0) {
      timeGauge.style.display = 'none'
      clearInterval(countdown)
      finalScore()
    }
  }, 1000)
}

function finalScore() {
  adventurer.play()

  timeGauge.style.display = 'none'
  quiz.style.display = 'none'
  scoreDiv.style.display = 'block'
  scoreDiv.innerHTML = 'Your score is : ' + score + '!'

  initialBox.style.display = 'block'
  initialBtn.style.display = 'block'

  localStorage.setItem('score', score)
}
var highScores = JSON.parse(localStorage.getItem('highScores')) || []

function saveHighScore(e) {
  e.preventDefault()

  // we need to save the score they got and their initials to local storage
  var displayFinal = document.createElement('h1')
  displayFinal.innerHTML = 'Final Scores'
  displayHigh.append(displayFinal)

  var playerScore = {
    score: score,
    name: initialBox.value
  }
  highScores.push(playerScore)
  localStorage.setItem('highScores', JSON.stringify(highScores))

  for (x = 0; x < highScores.length; x++) {
    var el = document.createElement('ul')
    displayHigh.appendChild(el)
    el.append(highScores[x].name + ' scored a : ' + highScores[x].score)
  }
}

function showHigh() {
  // we need to save the score they got and their initials to local storage
  var displayFinal = document.createElement('h1')
  displayFinal.innerHTML = 'Final Scores'
  displayHigh.append(displayFinal)

  for (x = 0; x < highScores.length; x++) {
    var el = document.createElement('ul')
    displayHigh.appendChild(el)
    el.append(highScores[x].name + ' scored a : ' + highScores[x].score)
  }
}
