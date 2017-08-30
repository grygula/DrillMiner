if (!miner) {
    var miner = (function () {
         const PAGE_STATUS = {
            QUIZ_ANSWERED: 0,
            QUIZ_NOT_ANSWERED: 1,
            PRACTICE_EXAM_RECAP: 2,
            OTHER_PAGE:4
        }

        function run(callback) {
            let testPage = getIframeContent("PR_EndUserDashboardIfr");
            if (isTestAnswered(testPage)) {
                callback ({ 'status': 0, 'data': getQuestions(testPage) });
            } else{
                callback ( { 'status': (isTestPage(testPage) ? 3 : 4) });
            }
        }

        function getIframeContent(iframeId) {
            let iframe = document.getElementById(iframeId);
            return iframe.contentDocument || iframe.contentWindow.document;
        }

        function isTestAnswered(el) {
            return (isQuizPageAnswered(el) || isPrepExamPageAnswered(el)) ;
        }
        function isQuizPageAnswered(el){
            let candidatesQuizPage = el.getElementsByClassName("LessonNavComplete");
            return candidatesQuizPage && candidatesQuizPage.length === 1;
        }
        function isPrepExamPageAnswered(el){
            let candidates = el.getElementsByClassName('pzbtn-mid');
            for(let i =candidates.length;i;i--){
                let cand = candidates[i-1];
                if (cand.innerText==='RE-SUBMIT'){
                    return true;
                }
            }
            return false;
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
            miner.run(sendResponse);
        }
    });
}
