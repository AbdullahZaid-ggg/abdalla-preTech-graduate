/////////the main link:
[text](https://docs.google.com/document/d/e/2PACX-1vQexVJXLdS2XAtd8NSWzH1fagLM2fO_-ldFtMPvaDu7fzhb4LstE9Ma1pUI3YGlx1opXo9S_PiGblbF/pub)



Quiz Game - Final Project


Welcome to the final project! In this project you will build an interactive quiz game where players answer multiple-choice questions and see their score update in real-time. You can make it about any topic you love!


Your questions (and answers) will be stored in an hard-coded array
const quizQuestions = [
   {
       question: "What does HTML stand for?",
       answers: ["Option A", "Option B", "Option C", "Option D"],
       correct: 0  // index of correct answer
   },
   // Add 5+ more questions!
];


When the site loads the score will be 0 and screen will show the first question (and answers)



Clicking on an answer will show an alert update the score and will update the screen with the score and the next question




After answering the last question the screen will show a “Quiz Complete” screen with your final score and a button to “Play Again”




The above screen shots are just examples - you can style the quiz game as you desire.

JavaScript Tips
Here you will find some tips on how to implement the logic (JavaScript) code.

Global Variables
Consider having the following variables:


quizQuestions 

An array that holds the quiz questions and answers (see example above).


currentQuestionIndex

Holds the current question that is now visible. Starts at 0.


score

Holds the current score. Start at 0.

Function
Consider having the following function:

restartQuiz()

Reset all variables to 0
Hide results, show quiz
Call showQuestion()
showQuestion()

Get current question from array
Update question text
Update all answer texts

checkAnswer(selectedIndex)

Compare selected answer with correct answer
If correct: show alert with text “Correct!” and increase score
If wrong: show alert with text “Wrong!”
call nextQuestion()
nextQuestion()

Reset button colors
Increase currentQuestionIndex
If more questions: call showQuestion()
If done: call showResults()
showResults()

Hide quiz screen, show results screen
Display final score
Clicking on “Play Again” calls restartQuiz()
Bonus Extension 1
Instead of showing an alert for a correct or wrong answer - change the color of the selected answer to green if correct or red if wrong. Then wait for 1 or 2 seconds and only then move to the next question.

Bonus Extension 2 - APIs
You can go ahead and implement this extension also without implementing extension 1


Instead of storing the quiz questions hard-coded, fetch the questions (and answers) from an external API.


Open Trivia Database is a straight forward, easy and no-authentication API endpoint for quiz questions.
In the following URL you can create a URL for generated random questions. You can decide what is the category, how many questions to generate, difficulty level and more. Here is the link: https://opentdb.com/api_config.php
For example, the following URL will generate 5 easy questions in sports: https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple
