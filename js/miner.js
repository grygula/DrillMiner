var miner = (function () {
    const continueButtonClass = "LessonNavComplete", ifId = "PR_EndUserDashboardIfr";
    function testRun() {
        console.log('Code is here');
        let testPage = getIframeContent(ifId);
        if (isTestAnswered(testPage, continueButtonClass)) {
            getQuestions(testPage);
        } else {
            console.warn("Do test first");
        }
    }

    function getIframeContent(iframeId) {
        var iframe = document.getElementById(iframeId);
        return iframe.contentDocument || iframe.contentWindow.document;
    }

    function isTestAnswered(el, clazz) {
        let candidates = el.getElementsByClassName(clazz);
        let isValid = candidates && candidates.length == 1;
        return isValid;
    }

    function getQuestions(el) {
        const bestClassToGetQuestions = 'item-3 RichTextContent';
        let cadidatesSections = el.getElementsByClassName(bestClassToGetQuestions)
        let candidatesSize = cadidatesSections.length;
        let questionsData = [];
        for (candidatesSize; candidatesSize; candidatesSize--) {
            let questionData = {};
            let candidate = cadidatesSections[candidatesSize - 1];
            questionData.txt = getQuestionTxt(candidate);
            questionData.answers = getAnswers(candidate);
            questionsData.push(questionData);
        }
        console.log(questionsData);
    }

    function getAnswers(questionElement) {
        let labels = getLabels(getAnswersSection(questionElement)),
            labelsSize = labels.length,
            answers = [];
        for (labelsSize; labelsSize; labelsSize--) {
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
        'testRun': testRun
    }
})();
miner.testRun();