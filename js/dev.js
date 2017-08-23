const CSS_CLASS_NAME = {
    BAD_APP: ['error','badApp'],
    BAD_PAGE_NOT_ACADEMY:['error', 'badPageNA'],
    BAD_PAGE_ON_ACADEMY:['error','badPageNotQuiz'],
    BAD_ANSWER: ['error','badNotAnswered'],
    SUCC_SHORT: ['success','succShort'],
    SUCC_SHORT_DONE: ['success','succShortDone'],
    SUCC_LONG: ['success','succLong'],
    SUCC_NO_CLIPBOARD :['success','succNoCLB']
}

function switchBodyClass(clazzName) {
    document.body.classList = "";
    console.log(clazzName);
    document.body.classList.add(...clazzName);
}

document.addEventListener('DOMContentLoaded', function () {
    var section = document.getElementById('devSection');
    for(let p in  CSS_CLASS_NAME){
        let v = CSS_CLASS_NAME[p];
        let element = document.createElement("button");
        element.value = p; 
        element.innerText = p + " : " + v;
        element.onclick = function() { // Note this is a function
            switchBodyClass(v);
        };
        section.appendChild(element);
    }
});