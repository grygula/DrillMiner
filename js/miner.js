var MAX6 = (function () {
    const continueButtonClass = "LessonNavComplete", ifId = "PR_EndUserDashboardIfr";
    function testRun() {
        console.log('Code is here');
        let testPage = getIframeContent(ifId);
        if (isTestAnswered(testPage, continueButtonClass)) {
            console.log('Good to get data');
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

    function getQuestions(el){
        const bestClassToGetQuestions = 'item-3 RichTextContent';
        let cadidatesSections = el.getElementsByClassName(bestClassToGetQuestions)
        let candidatesSize = cadidatesSections.length;
        let questionsData = [];
        for(candidatesSize;candidatesSize;candidatesSize--){
            let questionData = {};
            let candidate = cadidatesSections[candidatesSize-1];
            questionData.elm = candidate;
            questionData.txt = getQuestionTxt(candidate);
            console.log(questionData);
            questionsData.push(questionData);
        }
        console.log(questionsData);
    }

    function getQuestionTxt(el){
        let questionTxt = el.children[0].children[1].childNodes[0].nodeValue;
        return questionTxt; 
    }
    return {
        'testRun': testRun
    }
})();