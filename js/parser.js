var drillParser = (function () {
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const newLineCharacter = '\n';
    function parseData(data) {
        let finalTxt = "";
        for (let i = data.length; i; i--) {
            finalTxt += data[i - 1].question;
            finalTxt += newLineCharacter;
            finalTxt += getAnswers(data[i - 1].answers);
            finalTxt += newLineCharacter;
        }
        return finalTxt;
    };
    function getAnswers(answers) {
        let answTxt = "";
        let answerCounter = 0;
        for (let i = answers.length; i; i--) {
            const answer = answers[i - 1];
            if (answer.isCorrect) {
                answTxt += '>>>';
            }
            answTxt += alphabet[answerCounter++] + ') ' + answer.txt + newLineCharacter;
        }
        return answTxt;
    }
    return { 'parseData': parseData };
})();