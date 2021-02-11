window.onload = function () {
    const quiz = [
        ["Who is Iron Man?", "Tony Stark"],
        ["Who is the Hulk?", "Bruce Banner"],
        ["Who is Captain America?", "Steve Rogers"]
    ];
    let score = 0;

    function runGame() {
        for (const [question, answer] of quiz) {
            let response = prompt(question);
            checkAnswer(response, answer);
        }
        showScore();
    }

    function checkAnswer(response, answer) {
        if (response.toUpperCase() === answer.toUpperCase()) {
            alert("Yes! Good Job!");
            score++;
        } else {
            alert(`Incorrect. The correct answer is ${answer}`);
        }
    }
    function showScore() {
        alert(`The end. Your score is ${score}.`)
    }

    runGame();
}