// select all elements
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("show-questions");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var scoreDiv = document.getElementById("scoreContainer");
var quizInfo = document.getElementById("quiz-info");
var finalInputs = document.getElementById("initialBox");

// create our questions
var questions = [
    {
      question : "Which daedric prince's sphere of influence includes nightmares, psychological terror and torment, dreams, bringing evil omens, and stealing memories?",
      choiceA : "Mehrunes Dagon",
      choiceB : "Mephala",
      choiceC : "Vaermina",
      choiceD : "Clavicus Vile",
      correct: "C"
    },{
      question : "If you've completed the Companions main quests, then you are cursed with :",
      choiceA : "Vampirism",
      choiceB : "Polio",
      choiceC : "Lycanthropy",
      choiceD : "Hanahaki Disease",
      correct: "C"
    },{
      question : "What is life's greatest illusion?",
      choiceA : "Silence",
      choiceB : "Innocence",
      choiceC : "Worthiness",
      choiceD : "Sanguine",
      correct: "B"
    },{
        question : "If you are a member of Mage's Guild, then you have been to _____.",
        choiceA : "Winterhold",
        choiceB : "Balmora",
        choiceC : "Solitude",
        choiceD : "Dawnstar",
        correct: "A"
      },{
        question : "Over time, the _____ began to devolve into twisted, blinded creatures, becoming the degenerate race now known as the Falmer.",
        choiceA : "Snow Elves",
        choiceB : "High Elves",
        choiceC : "Dwemer",
        choiceD : "Ayleid",
        correct: "A"
      },{
        question : "After completing \"The House of Horrors\", this soul trapping daedric artifact is awarded to the Dragonborn :",
        choiceA : "Skull of Corruption",
        choiceB : "Skyforge Steel",
        choiceC : "Black Star",
        choiceD : "Mace of Molag Bal",
        correct: "D"
      },{
        question : "\"Fus Ro Dah!\" are the three words that form which Dragon Shout?",
        choiceA : "Unrelenting Force",
        choiceB : "Whirlwind Sprint",
        choiceC : "Dragonrend",
        choiceD : "Marked for Death",
        correct: "A"
      },{
        question : "Featuring a civil war following a king's death, hostile undead warriors, the appearance of dragons, and a murderous wedding, Skyrim bares incredible similarities to which wildly popular HBO series?",
        choiceA : "Outlander",
        choiceB : "The Last Kingdom",
        choiceC : "Pete's Dragon",
        choiceD : "Game of Thrones",
        correct: "D"
      },{
        question : "The Elder Scrolls V: Skyrim is heavily influenced by which polytheistic religion?",
        choiceA : "Neopaganism",
        choiceB : "Greek Mythology",
        choiceC : "Old Norse",
        choiceD : "Vedism",
        correct: "C"
      },{
        question : "Which of the following cannot become a follower?",
        choiceA : "A dog",
        choiceB : "A Giant",
        choiceC : "A riekling",
        choiceD : "An armored troll",
        correct: "B"
      },
];

// create some variables
var lastQuestion = questions.length - 1;
var currentQ = 0;
var count = 0;
var timer;
var score = 0;

//show a question
function showQuestion() {
    var questionsIndex = questions[currentQ];

    question.innerHTML = questionsIndex.question;
    choiceA.innerHTML = questionsIndex.choiceA;
    choiceB.innerHTML = questionsIndex.choiceB;
    choiceC.innerHTML = questionsIndex.choiceC;
    choiceD.innerHTML = questionsIndex.choiceD;
};


//on click event to start questions, start timer, keep score, show input box
start.addEventListener("click", startQuiz);

//start the quiz
function startQuiz() {
    quizInfo.style.display = "none";
    start.style.display = "none";
    showQuestion();
    quiz.style.display = "block";
    timer();
}

//check answer function -- if answer == correct score++

 function checkAnswer(answer) {
    if (answer == questions[currentQ].correct) {
        score++
    } else { //answer is wrong, timer is deducted --alt: answer!= questions[currentQ].correct
        timer -= 5 
    } 
    if (currentQ < lastQuestion) {
        currentQ++;
        showQuestion();
    } else {
        clearInterval(timer);
        finalScore();
    }
}

function timer() {
    timer = 15 * questions.length;
    //15 seconds per questions
    var countdown = setInterval(function() {
        timer--;
        timeGauge.innerHTML = timer;
         if (timer === 0) {
            timeGauge.style.display = "none";
            clearInterval(countdown);
            finalScore();
        }
    }, 1000);
}

function storeScore(event) {
    event.preventDefault();
    var user = {
      name: nameInput.value,
      savedScore: score
    };
    localStorage.setItem("storage", score /*JSON.stingify(user)*/);
  }

function finalScore() {

    //appending element and content to page
    var header = document.createElement("h2"); 
    var headerContent = document.createTextNode("All done!"); 
    header.appendChild(headerContent);   
    body.insertBefore(header, header.firstChild);

    timeGauge.style.display = "none"
    quiz.style.display = "none";
    scoreDiv.style.display = "block";
    scoreDiv.innerHTML = "Your score is :" + score +"!";
}

//show input box for initials on end of timer || end of quiz