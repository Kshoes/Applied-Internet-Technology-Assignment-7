// TODO 
// Add client side JavaScript
//

// const req = new XMLHttpRequest();
// req.open('GET', url, true);


function getQuestions() {
    const req = new XMLHttpRequest();

    let url = 'questions/';

    req.open('GET', url);

    function addToDOM() {
        // insert code here
    }

    // fetch(url)   // alternative
    //      .then(res => res.json())
    //      .then(addToDOM);

    // const res = await fetch(url);    // final form
    // const messages = await res.json();
    // addToDOM(messages);



    req.addEventListener('load', function(evt) {
        console.log(req.status, req.responseText);
        if(req.status >= 200 && req.status < 300) {

            const questions = JSON.parse(req.responseText);

            for(const q of questions) {

                const qABlock = document.getElementById('content').appendChild(document.createElement('article'));  // question/answer block
                qABlock.className = "qABlock";
                const qDiv = qABlock.appendChild(document.createElement('h3')); // question
                qDiv.textContent = q.question;

                const answers = q.answers;  
                const aList = qABlock.appendChild(document.createElement('ul'));    // answer list
                for(const a of answers) {
                    const aDiv = aList.appendChild(document.createElement('li'));
                    aDiv.textContent = a;
                }

                const addAnswerBtn = qABlock.appendChild(document.createElement('input'));
                addAnswerBtn.className = "addAnswerBtn";
                addAnswerBtn.type = "button";
                addAnswerBtn.value = "Add an Answer";
                const answerBtns = document.getElementsByClassName("addAnswerBtn");
                for(const a of answerBtns) {
                    a.addEventListener('click', showAnswerModal);
                }

            }

        }
    });
    req.addEventListener('error', function(evt) {
        document.body.appendChild(document.createTextNode('uh-oh, something went wrong ' + evt));
    });

    // setTimeout - delay call 
    // setInterval - repeat call with specific interval
    // use setTimeout to avoid race conditions

    req.send();
}

function showQuestionModal() {
    const questionModal = document.getElementById("modal-question");
    // questionModal.style.display = "block";
    // console.log(questionModal.style.display);
    // console.log(questionModal.classList);
    questionModal.classList.add('open');
}

function showAnswerModal() {
    const answerModal = document.getElementById("modal-answer");
    answerModal.classList.add('open');
}

function hideModal() {
    const modals = document.getElementsByClassName("modal");
    for(const m of modals) {
        // m.style.display = "none";
        m.classList.remove('open');
    }
}

function submitQuestion() {
    const question = document.getElementById('question-text').value;
    const req = new XMLHttpRequest();
    req.open('POST', '/questions/', true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    req.send('question=' + question);

    req.addEventListener('load', function() {

        const qABlock = document.getElementById('content').appendChild(document.createElement('article'));  // question/answer block
        qABlock.className = "qABlock";
        const qDiv = qABlock.appendChild(document.createElement('h3')); // question
        qDiv.textContent = question;

        const addAnswerBtn = qABlock.appendChild(document.createElement('input'));
        addAnswerBtn.className = "addAnswerBtn";
        addAnswerBtn.type = "button";
        addAnswerBtn.value = "Add an Answer";
        
        const answerBtns = document.getElementsByClassName("addAnswerBtn");
        for(const a of answerBtns) {
            a.addEventListener('click', showAnswerModal);
        }

        hideModal();
        console.log(req.status, req.responseText);
    });
    req.addEventListener('error', function() {
        console.log('error adding new question');
    })

}

// function addQABlock(question) {
//     const qABlock = document.getElementById('content').appendChild(document.createElement('article'));  // question/answer block
//     qABlock.className = "qABlock";
//     const qDiv = qABlock.appendChild(document.createElement('h3')); // question
//     qDiv.textContent = question;
// }

function main() {

    getQuestions();

    const askBtn = document.getElementById("btn-show-modal-question");
    askBtn.addEventListener('click', showQuestionModal);
    
    // const answerBtns = document.getElementsByClassName("addAnswerBtn");
    // for(const a of answerBtns) {
    //     a.addEventListener('click', showAnswerModal);
    // }

    const cancelButtons = document.getElementsByClassName("close");
    for(const c of cancelButtons) {
        c.addEventListener('click', hideModal);
    }

    const createQBtn = document.getElementById("create-question");
    createQBtn.addEventListener('click', submitQuestion);
}

document.addEventListener("DOMContentLoaded", main);
