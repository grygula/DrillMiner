if (!miner) {
    var miner = (function () {
        function run() {
            let testPage = getIframeContent("PR_EndUserDashboardIfr");
            if (isTestAnswered(testPage)) {
                return { 'status': 0, 'data': getQuestions(testPage) }
            } else {
                return { 'status': (isTestPage(testPage) ? 3 : 4) };
            }
        }

        function getIframeContent(iframeId) {
            let iframe = document.getElementById(iframeId);
            return iframe.contentDocument || iframe.contentWindow.document;
        }

        function isTestAnswered(el) {
            let candidates = el.getElementsByClassName("LessonNavComplete");
            return candidates && candidates.length == 1;
        }
        function isTestPage(el) {
            let candidates = el.getElementsByClassName("LessonNav");
            for (let i = candidates.length; i; i--) {
                let c = candidates[i - 1];
                if (c && c.dataset && c.dataset.click && c.dataset.click.indexOf('AdvanceFromQuiz') > -1) {
                    return true;
                }
            }
            return false;
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
            let candidates = el.getElementsByClassName('dataValueRead');
            if (candidates.length == 1) {
                return candidates[0].innerText;
            } else {
                return el.children[0].children[1].childNodes[0].nodeValue;
            }
        }
        return {
            'run': run
        }

    })();
    chrome.runtime.onMessage.addListener(function (msg, _, sendResponse) {
        if (msg === "run") {
            sendResponse(miner.run());
        }
    });
}
