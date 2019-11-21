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
                const qDiv = qABlock.appendChild(document.createElement('h3')); // question
                qDiv.textContent = q.question;

                const answers = q.answers;  
                const aList = qABlock.appendChild(document.createElement('ul'));    // answer list
                for(const a of answers) {
                    const aDiv = aList.appendChild(document.createElement('li'));
                    aDiv.textContent = a;
                }

                const addAnswerBtn = qABlock.appendChild(document.createElement('input'));
                addAnswerBtn.type = "button";
                addAnswerBtn.value = "Add an Answer";

            }

        }
    });
    req.addEventListener('error', function(evt) {
        document.body.appendChild(document.createTextNode('uh-oh, something went wrong ' + evt));
    });

    // setTimeout - delay call 
    // setInterval - repeat call with specific interval
    // use setTimeout to avoid race conditions

    //setTimeout(getQuestions, 500);

    req.send();
}

function main() {
    getQuestions();
}

document.addEventListener("DOMContentLoaded", main);
