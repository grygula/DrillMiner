var mX = (function () {
    const continueButtonClass = "LessonNavComplete", ifId = "PR_EndUserDashboardIfr";
    function testRun() {
        console.log('Code is here');
        let testPage = getIframeContent(ifId);
        if (isTestAnswered(testPage, continueButtonClass)) {
            console.log('Good to get data');
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
    return {
        'testRun': testRun
    }
})();