const STORE = [
  {
    question: 'What is “coq-au-vin”?',
    answers: [
      'Grape leaves stuffed with ground chicken',
      'A crockpot used to simmer meats',
      'An elegant centerpiece made with wine-colored feathers',
      'A whole rooster braised with wine, lardons and mushrooms'
    ],
    correctAnswer:
      'A whole rooster braised with wine, lardons and mushrooms',

    answerImage: '<img src="https://i.ibb.co/P9s08xr/shutterstock-1380334856.jpg" alt="coq-au-vin" class="answerImages">',
   },
   
   {
    question:
      'What is “roquefort”?',
    answers: [
      'A very strong mustard',
      'A white and blue moldy cheese made from sheep’s milk',
      'Rock-shaped candied fruits',
      'A brandy-like spirit usually enjoyed at the end of a meal'
    ],
    
    answerImage: '<img src="https://i.ibb.co/rt9qq90/roquefort.jpg" alt="roquefort" class="answerImages">',
    
    correctAnswer:
    'A white and blue moldy cheese made from sheep’s milk'
  },
  
  {
    question:
      'What is “bouillabaisse”?',
    answers: [
      'The stock used to make onion soup',
      'The frosting in a yule log-shaped dessert',
      'The condiments that go with steak tartare',
      'A soup made with fish, shellfish and tomatoes',

    ],
    
    answerImage: '<img src="https://i.ibb.co/sJ6q5c2/bouillabaisse.jpg" alt="bouillabaisse" class="answerImages">',
    
    
    correctAnswer:
    'A soup made with fish, shellfish and tomatoes'
  },
  
  {
    question: 'What is “tarte-tatin”?',
    answers: [
      'A savory tart made with eggs, cheese and herbs',
      'Crispy potato cakes otherwise known as “croquettes"',
      'An upside down caramelized apple pie',
      'A cocktail made with orange juice and sparkling wine'
    ],
    
    answerImage: '<img src="https://i.ibb.co/WfPJT6x/tarte-tatin.jpg" alt="tarte-tatin" class="answerImages">',
    
    correctAnswer:
    'An upside down caramelized apple pie'
  },
  {
    question:
      'What is “gratin-dauphinois”?',
    answers: [
      'Melted cheese served with potatoes on the side',
      'A mixed salad with olives, anchovies and grated carrots',
      'A custard dessert with a crunchy caramel topping',
      'Sliced potatoes baked with cream'
    ],
    
    answerImage: '<img src="https://i.ibb.co/5KXk4k0/gratin-dauphinois.jpg" alt="gratin-dauphinois" class="answerImages">',
    
    correctAnswer: 'Sliced potatoes baked with cream'
  }
];

//variables to store the quiz score and question number information
let score = 0;
let questionNumber = 0;

//template to generate each question
function generateQuestion() {
  if (questionNumber < STORE.length) {
    return createThing(questionNumber);
  } else {
    $('.questionBox').hide();
    finalScore();
    $('.questionNumber').text(5);
  }
}

//increments the number value of the "score" variable by one
//and updates the "score" number text in the quiz view
function updateScore() {
  score++;
  $('.score').text(score);
}

//increments the number value of the "question number" variable by one
//and updates the "question number" text in the quiz view
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

//resets the text value of the "question number" and "score" variables
//and updates their repective text in the quiz view
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

//begins the quiz
function startQuiz() {
  $('.altBox').hide();
  $('.startQuiz').on('click', '.startButton', function (event) {
    $('.startQuiz').hide();
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(generateQuestion());
  });
}

//submits a selected answer and checks it against the correct answer
//runs answer functions accordingly
function submitAnswer() {
  $('.mainBox').on('submit', function (event) {
    event.preventDefault();
    $('.altBox').hide();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

//creates html for question form
function createThing(questionIndex) {
  let formMaker = $(`<form>
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`)

  let fieldSelector = $(formMaker).find('fieldset');

  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="sizeMe" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
  return formMaker;
}

//resulting feedback if a selected answer is correct
//increments user score by one
function correctAnswer() {
  $('.response').html(
    `<h3>Correct!</h3>
    <img src="images/correct.jpg" alt="smart-chef" class="correctImage">
     <p class="sizeMe">${STORE[questionNumber].correctAnswer}</p>
     <p class="sizeMe">${STORE[questionNumber].answerImage}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
  updateScore();
}

//resulting feedback if a selected answer is incorrect
function wrongAnswer() {
  $('.response').html(
    `<h3>Incorrect!</h3>
    <img src="images/incorrect.jpg" alt="incorrect" class="incorrectImage">
    <p class="sizeMe">${STORE[questionNumber].correctAnswer}</p>
     <p class="sizeMe">${STORE[questionNumber].answerImage}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}

//generates the next question
function nextQuestion() {
  $('.mainBox').on('click', '.nextButton', function (event) {
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(generateQuestion());
  });
}

//determines final score and feedback at the end of the quiz
function finalScore() {
  $('.final').show();

  const great = [
    'Très Bien!',
    'Bon Appétit'
    ];

  const good = [
    'Bien!',
    'Bon Appétit!',
  ];

  const bad = [
    'Try Again?',
    'Merci!',
  ];

  if (score > 4) {
    array = great;
  } else if (score > 2) {
    array = good;
  } else {
    array = bad;
  }
  return $('.final').html(
    `<h3>${array[0]}</h3>
        <img src="images/background.jpg" class="endImage">
     <h3>Your score is ${score} / 5</h3>
     <h3>${array[1]}</h3>
        <button type="submit" class="restartButton button">Restart</button>`
  );
}

//takes user back to the starting view to restart the quiz
function restartQuiz() {
  $('.mainBox').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.startQuiz').show();
  });
}

//runs the functions
function makeQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);
