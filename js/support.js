let txtLg;

const ERROR_CODE = {
    APP_PROBLEM: 0,
    INCORRECT_PAGE: 1,
    NO_ANSWERS: 0
}
const CSS_CLASS_NAME = {
    BAD_APP: ['error','badApp'],
    BAD_PAGE_NOT_ACADEMY:['error', 'badPageNA'],
    BAD_PAGE_ON_ACADEMY:['error','badPageNotQuiz'],
    BAD_ANSWER: ['error','badNotAnswered'],
    SUCC_SHORT: ['success','succShort'],
    SUCC_LONG: ['success','succLong'],
    SUCC_NO_CLIPBOARD :['success','succNoCLB']
}
const LKP = {
    ACADEMY_PAGE: 'pegaacademyapp.pega.com'
}
const mlg = function (txt) {
    console.log(txt);
}

let sendMessageToPage = function () { mlg('Communication NA'); };

function workWithTabs() {
    var queryInfo = {
        active: true,
        currentWindow: true
    };
    chrome.tabs.query(queryInfo, function (tabs) {
        if (!tabs || tabs.length !== 1) {
            invalid(ERROR_CODE.APP_PROBLEM);
            return;
        }
        let currentTab = tabs[0];
        if (isValidURL(currentTab.url)) {
            sendMessageToPage = function (msg, callBack) {
                chrome.tabs.sendMessage(currentTab.id, msg, callBack);
            };

            chrome.tabs.executeScript(currentTab.id, { file: "js/miner.js" }, function () {
                mlg('loaded');
                sendMessageToPage('run', function (response) {
                    handlePageMessage(response);
                });
            });
        } else {
            invalid(ERROR_CODE.INCORRECT_PAGE);
        }
    });
}
function handlePageMessage(msg) {
    if (msg.status === ERROR_CODE.NO_ANSWERS) {
        invalid(ERROR_CODE.NO_ANSWERS);
    } else {
        let result = drillParser.parseData(msg.data);
        let txtField = setResultSection(result);
        try {
            txtField.select();
            document.execCommand('Copy');
        } catch (ex) {
            mlg(ex);
        }

    }
}
function setResultSection(txt) {
    let txtField = document.getElementById('drillText');
    txtField.value = txt;
    return txtField;
}
function isValidURL(url) {
    return url.indexOf(LKP.ACADEMY_PAGE) !== -1;
}
function switchBodyClass(clazzName) {
    document.body.classList = "";
    document.body.classList.add(...clazzName);
}
function invalid(reason) {
    let clazzToSet = "";
    switch (reason) {
        case ERROR_CODE.APP_PROBLEM:
            clazzToSet = CSS_CLASS_NAME.BAD_APP;
            break;
        case ERROR_CODE.INCORRECT_PAGE:
            clazzToSet = CSS_CLASS_NAME.BAD_PAGE_NOT_ACADEMY;
            break;
        case ERROR_CODE.NO_ANSWERS:
            clazzToSet = CSS_CLASS_NAME.BAD_ANSWER;
            break;
        default:
    }
    switchBodyClass(clazzToSet);
}
document.addEventListener('DOMContentLoaded', function () {
    workWithTabs();
});
