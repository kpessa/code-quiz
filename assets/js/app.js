// SECTIONS
var secIntro = document.getElementById('intro');
var secQuiz = document.getElementById('quiz');
var secEnding = document.getElementById('ending');
var secHighScores = document.getElementById('high-score-view');

// QUIZ ELEMENTS
var h1 = document.getElementById('quiz-question');
var quizList = document.getElementById('quiz-list');
var pResult = document.querySelector('.result');

// ENDING ELEMENT
var spnScore = document.getElementById('score');
var form = document.getElementById('form');
var initials = document.getElementById('initials');
var buttons = document.querySelector('.buttons');

// HIGH SCORES
var btnGoBack = document.getElementById('go-back');
var btnClear = document.getElementById('clear');

var btnStart = document.getElementById('btnStart');
var spnClock = document.getElementById('clock');

var interval;
var time = 100;
var i = 0; // Question Index

var goBackHandler = function () {
  form.reset();
  i = 0;
  time = 100;
  spnClock.textContent = '100';
  secHighScores.style.display = 'none';
  secIntro.style.display = 'block';
};

var transitionToHighScores = function () {
  secEnding.style.display = 'none';
  secIntro.style.display = 'none';
  secHighScores.style.display = 'block';

  var initials = localStorage.getItem('initials');
  var highScore = localStorage.getItem('highScore');

  if (initials && highScore) {
    var p = document.createElement('p');
    p.className = 'high-scores';
    p.textContent = `${initials} - ${highScore}`;
    secHighScores.insertBefore(p, buttons);
  }
};

var frmHighScoreSubmitHandler = function (event) {
  event.preventDefault();

  var initialsVal = initials.value;

  var highScore = localStorage.getItem('highScore');

  if (!highScore || time >= highScore) {
    localStorage.setItem('initials', initialsVal);
    localStorage.setItem('highScore', time);
  }

  transitionToHighScores();
};

var transitionToEnding = function () {
  clearInterval(interval);
  secQuiz.style.display = 'none';
  secEnding.style.display = 'block';
  spnScore.textContent = time;
};

var quizClickHandler = function (event) {
  if (event.target.tagName == 'LI') {
    if (event.target.textContent == questions[i].answer) {
      pResult.textContent = 'Correct!';
    } else {
      pResult.textContent = 'Wrong!';
      time == 10;
    }
    i++;
    if (i < 2) {
      createQuestion();
    } else {
      transitionToEnding();
    }
  }
};

var createQuestion = function () {
  h1.textContent = questions[i].question;
  quizList.innerHTML = '';
  questions[i].choices.forEach(function (choice) {
    var li = document.createElement('li');
    li.className = 'btn';
    li.textContent = choice;
    quizList.appendChild(li);
  });
};

var btnStartHandler = function () {
  interval = setInterval(countdown, 1000);
  secIntro.style.display = 'none';
  secQuiz.style.display = 'block';
  createQuestion();
};

var countdown = function () {
  if (time >= 0) {
    time--;
    spnClock.textContent = time;
  } else {
    clearInterval(interval);
    time = 0;
    transitionToEnding();
  }
};

secQuiz.onclick = quizClickHandler;
btnStart.onclick = btnStartHandler;
form.onsubmit = frmHighScoreSubmitHandler;
btnGoBack.onclick = goBackHandler;
