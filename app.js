function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

//question protoype
Question.prototype.checkAnswer = function (answer) {
    return this.answer === answer;
}

function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.questionsIndex = 0;
}

Quiz.prototype.getQuestion = function () {
    return this.questions[this.questionsIndex];
}


Quiz.prototype.isFinish = function () {
    return this.questions.length === this.questionsIndex;
}


Quiz.prototype.guess = function (answer) {
    var question = this.getQuestion();
    if (question.checkAnswer(answer)) {
        this.score++;
    }
    this.questionsIndex++;
}


var q1 = new Question("What's the best programing?", ["C#", "JavaScript", "Python", "Java"], "JavaScript");
var q2 = new Question("What's the most popular language?", ["c#", "visual basic", "nodejs", "javascript"], "javascript");
var q3 = new Question("What's the best framework?", ["React", "Angular", "Vue", "Svelte"], "React");


var questions = [q1, q2, q3];

//start quiz

var quiz = new Quiz(questions);

loadQuestion();

/*function loadQuestion() {
    if (quiz.isFinish()) {
        showScore();
    }
    else {
        var question = quiz.getQuestion();
        var choices = question.choices[i];
        document.querySelector('#question').textContent = question.text;

        for (var i = 0; i < choices.length; i++) {
            document.querySelector('#choice' + i);
            element.innerHTML = choices[i];

            guess('btn' + i, choices[i]);
        }

        showProgress();
    }

}*/

function loadQuestion() {
    if (quiz.isFinish()) {
        showScore();
        return; // ❗ önemli: skor gösterildikten sonra işlem devam etmesin
    }

    var question = quiz.getQuestion();
    document.querySelector("#question").textContent = question.text;

    for (var i = 0; i < question.choices.length; i++) {
        var choice = question.choices[i];
        var button = document.getElementById("btn" + i);
        var span = document.getElementById("choice" + i);
        span.innerHTML = choice;

        guess("btn" + i, choice[i]);
    }

    showProgress();
}



function guess(id, guess) {
    var btn = document.getElementById(id);
    btn.onclick = function () {
        quiz.guess(guess);
        loadQuestion();
    }


}

function showScore() {

    var html = `<h2>Score</h2><h4>${quiz.score}</h4>`;

    document.querySelector('.card-body').innerHTML = html;

}

function showProgress() {
    var totalQuestion = quiz.questions.length;
    var questionNumber = quiz.questionsIndex + 1;
    document.querySelector('#progress').innerHTML = 'Question ' + questionNumber + ' of ' + totalQuestion;

}

