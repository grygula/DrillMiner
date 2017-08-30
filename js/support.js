let txtLg;

const STATUS_CODES = {
    OK: 0,
    APP_PROBLEM: 1,
    INCORRECT_PAGE: 2,
    NO_ANSWERS: 3,
    NO_QUIZ_PAGE: 4,
    NO_CLIPBOARD_SUPPORT: 5,
    PRACTICE_EXAM_RESULT: 6
}
const CSS_CLASSES = {
    BAD_APP: ['error', 'badApp'],
    BAD_PAGE_NOT_ACADEMY: ['error', 'badPageNA'],
    BAD_PAGE_ON_ACADEMY: ['error', 'badPageNotQuiz'],
    BAD_ANSWER: ['error', 'badNotAnswered'],
    SUCC_SHORT: ['success', 'succShort'],
    SUCC_SHORT_DONE: ['success','succShortDone'],
    SUCC_LONG: ['success', 'succLong'],
    SUCC_NO_CLIPBOARD: ['success', 'succNoCLB']
}
const LKP = {
    ACADEMY_PAGE: 'pegaacademyapp.pega.com'
}
const mlg = function (txt) {
    console.log(txt);
}

let sendMessageToPage = function () { mlg('Communication NA'); };

function start() {
    var queryInfo = {
        active: true,
        currentWindow: true
    };
    chrome.tabs.query(queryInfo, function (tabs) {
        if (!tabs || tabs.length !== 1) {
            handleStatus(STATUS_CODES.APP_PROBLEM);
            return;
        }
        let currentTab = tabs[0];
        if (isValidURL(currentTab.url)) {
            sendMessageToPage = function (msg, callBack) {
                chrome.tabs.sendMessage(currentTab.id, msg, callBack);
            };
            chrome.tabs.executeScript(currentTab.id, { file: "js/miner.js" }, function () {
                sendMessageToPage('run', function (response) {
                    handlePageMessage(response);
                });
            });
        } else {
            handleStatus(STATUS_CODES.INCORRECT_PAGE);
        }
    });
}
function handlePageMessage(msg) {
    let status = msg.status;
    if (status === STATUS_CODES.OK) {
        try {
            let txt = drillParser.parseData(msg.data);
            let txtField = document.getElementById('drillText');
            txtField.value = txt;
            if (document.queryCommandSupported('copy')) {
                handleStatus(STATUS_CODES.OK);
            } else {
                handleStatus(STATUS_CODES.NO_CLIPBOARD_SUPPORT)
            }
        } catch (ex) {
            handleStatus(STATUS_CODES.APP_PROBLEM);
        }

    } else {
        handleStatus(status);
    }
}
function copyToCliboard(el) {
    var range = document.createRange();
    range.selectNode(el);
    window.getSelection().addRange(range);
    let result = false;
    try {
        result = document.execCommand('copy');
    } catch (err) {
        handleStatus(STATUS_CODES.NO_CLIPBOARD_SUPPORT)
        result = false;
    }
    window.getSelection().removeAllRanges();

    return result;
}
function isValidURL(url) {
    return url.indexOf(LKP.ACADEMY_PAGE) !== -1;
}
function switchBodyClass(clazzName) {
    document.body.classList = "";
    document.body.classList.add(...clazzName);
}
function handleStatus(reason) {
    let clazzToSet = "";
    switch (reason) {
        case STATUS_CODES.APP_PROBLEM:
            clazzToSet = CSS_CLASSES.BAD_APP;
            break;
        case STATUS_CODES.INCORRECT_PAGE:
            clazzToSet = CSS_CLASSES.BAD_PAGE_NOT_ACADEMY;
            break;
        case STATUS_CODES.NO_ANSWERS:
            clazzToSet = CSS_CLASSES.BAD_ANSWER;
            break;
        case STATUS_CODES.NO_QUIZ_PAGE:
            clazzToSet = CSS_CLASSES.BAD_PAGE_ON_ACADEMY
            break;
        case STATUS_CODES.NO_CLIPBOARD_SUPPORT:
            clazzToSet = CSS_CLASSES.SUCC_NO_CLIPBOARD;
            break;
        case STATUS_CODES.OK:
            clazzToSet = CSS_CLASSES.SUCC_SHORT;
        default:
    }
    switchBodyClass(clazzToSet);
}
document.addEventListener('DOMContentLoaded', function () {
    start();
    document.getElementById('fullButton').onclick = function () {
        switchBodyClass(CSS_CLASSES.SUCC_LONG);
    }
    document.getElementById('copyToCLB').onclick = function () {
        copyToCliboard(document.getElementById('drillText'));
    }
    document.getElementById('copyToCLBShort').onclick = function () {
        if(copyToCliboard(document.getElementById('drillText'))){
            switchBodyClass(CSS_CLASSES.SUCC_SHORT_DONE);
        }
    }
});
