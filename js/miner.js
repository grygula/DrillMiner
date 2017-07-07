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
        for (let i = 0; i < answers.length; i++) {
            const answer = answers[i];
            if (answer.isCorrect) {
                answTxt += '>>>';
            }
            answTxt += alphabet[i] + ') ' + answer.txt + newLineCharacter;
        }
        return answTxt;
    }
    return { 'parseData': parseData };
})();

var miner = (function () {
    const continueButtonClass = "LessonNavComplete", ifId = "PR_EndUserDashboardIfr";
    function run() {
        let testPage = getIframeContent(ifId);
        if (isTestAnswered(testPage, continueButtonClass)) {
            const data = getQuestions(testPage);
            const result = drillParser.parseData(data);
            console.log(result);
        } else {
            console.error("Do test first");
        }
    }

    function getIframeContent(iframeId) {
        let iframe = document.getElementById(iframeId);
        return iframe.contentDocument || iframe.contentWindow.document;
    }

    function isTestAnswered(el, clazz) {
        let candidates = el.getElementsByClassName(clazz);
        return candidates && candidates.length == 1;
    }

    function getQuestions(el) {
        const bestClassToGetQuestions = 'item-3 RichTextContent';
        let cadidatesSections = el.getElementsByClassName(bestClassToGetQuestions),
            questionsData = [];
        for (let candidatesSize = cadidatesSections.length; candidatesSize; candidatesSize--) {
            let questionData = {};
            let candidate = cadidatesSections[candidatesSize - 1];
            questionData.question = getQuestionTxt(candidate);
            questionData.answers = getAnswers(candidate);
            questionsData.push(questionData);
        }
        return questionsData;
    }

    function getAnswers(questionElement) {
        let labels = getLabels(getAnswersSection(questionElement)),
            answers = [];
        for (let labelsSize = labels.length; labelsSize; labelsSize--) {
            answers.push(getAnswerBaseOnLabel(labels[labelsSize - 1]));
        }
        return answers;
    }
    function getAnswersSection(questionElement) {
        return questionElement.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling;
    }
    function getLabels(elm) {
        return elm.getElementsByTagName('LABEL');
    }
    function getAnswerBaseOnLabel(lbl) {
        let result = {};
        result.txt = lbl.innerHTML;
        //this is input -risky but fast
        result.isCorrect = lbl.previousSibling.checked;
        return result;
    }
    function getQuestionTxt(el) {
        return el.children[0].children[1].childNodes[0].nodeValue;
    }
    return {
        'run': run
    }
})();
miner.run();